import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadNewsDetails } from '../store/NewsDetails.slice';
import NewsTranslation from './NewsTranslation';

export default function NewsDetails() {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadNewsDetails({ id: params.id }));
    }, []);

    return (
        <div className="container-xxl">
            <NewsTranslation />
        </div>
    );
}
