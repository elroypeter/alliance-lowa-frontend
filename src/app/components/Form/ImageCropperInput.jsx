import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

export default class ImageCropperInput extends Component {
    state = {
        config: {
            viewport: { width: 100, height: 100 },
            boundary: { height: 300 },
            showZoomer: true,
            enableResize: true,
            enableOrientation: true,
            enableZoom: true,
            mouseWheelZoom: 'ctrl',
            ...this.props.config,
        },
        Croppie: null,
    };

    componentDidMount() {
        this.loadCroppie();
    }

    componentDidUpdate(prevProps) {
        // Re-initialize if the ID changes or if Croppie was just loaded
        if (prevProps.id !== this.props.id || (this.state.Croppie && !this.croppieInstance)) {
            this.setUpCroppie();
        }
    }

    componentWillUnmount() {
        // Clean up Croppie instance
        if (this.croppieInstance && this.croppieInstance.destroy) {
            this.croppieInstance.destroy();
        }
    }

    loadCroppie = async () => {
        try {
            // Import croppie CSS
            await import('croppie/croppie.css');
            
            // Import croppie module
            const croppieModule = await import('croppie');
            
            // Handle different export formats
            let CroppieClass = null;
            
            // Try default export first
            if (croppieModule.default && typeof croppieModule.default === 'function') {
                CroppieClass = croppieModule.default;
            }
            // Try named export
            else if (croppieModule.Croppie && typeof croppieModule.Croppie === 'function') {
                CroppieClass = croppieModule.Croppie;
            }
            // Try the module itself (CommonJS)
            else if (typeof croppieModule === 'function') {
                CroppieClass = croppieModule;
            }
            // Try accessing constructor from module
            else if (croppieModule && typeof croppieModule === 'object') {
                // Check all properties
                for (const key in croppieModule) {
                    if (typeof croppieModule[key] === 'function' && key.toLowerCase().includes('croppie')) {
                        CroppieClass = croppieModule[key];
                        break;
                    }
                }
            }
            
            if (!CroppieClass || typeof CroppieClass !== 'function') {
                throw new Error('Could not find Croppie constructor');
            }
            
            this.setState({ Croppie: CroppieClass }, () => {
                // Small delay to ensure DOM is ready
                setTimeout(() => {
                    this.setUpCroppie();
                }, 100);
            });
        } catch (error) {
            console.error('Failed to load Croppie:', error);
        }
    };

    setUpCroppie = () => {
        const { Croppie } = this.state;
        if (!Croppie) return;
        
        this.croppieTarget = document.getElementById(this.props.id);
        if (!this.croppieTarget) return;
        
        try {
            this.croppieInstance = new Croppie(this.croppieTarget, this.state.config);
            this.initCroppieData(this.croppieInstance);
        } catch (error) {
            console.error('Failed to initialize Croppie:', error);
        }
    };

    initCroppieData = (croppie) => {
        if (this.props.value) {
            const base64Data = this.props.value;
            const contentType = base64Data.split(';')[0].split(':')[1];
            const base64 = base64Data.split(';')[1].split(',')[1];

            const blob = this.b64toBlob(base64, contentType);
            const preview = URL.createObjectURL(blob);
            croppie.bind({ url: preview });
        }
    };

    b64toBlob = (b64Data, contentType, sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };

    render() {
        return (
            <>
                <label className="form-label d-flex align-items-center justify-content-between fs-6">
                    <span>{this.props.label}</span>
                    <div>
                        <span className="badge bg-primary">
                            <FontAwesomeIcon icon={faUpload} className="me-2" />
                            select file
                        </span>
                        <input
                            onChange={(evt) => {
                                this.props.onChange(evt, this.croppieInstance, this.croppieTarget);
                            }}
                            type="file"
                            name="myfile"
                            hidden={true}
                        />
                    </div>
                </label>
                <div id={this.props.id}></div>
            </>
        );
    }
}
