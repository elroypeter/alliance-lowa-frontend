import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Breadcrumb(props) {
    const [currentPage, setState] = useState(props.menuList[0]);

    props.locationChange((path) => {
        const page = props.menuList.find((menu) => path.includes(menu.link));
        if (page) setState(page);
    });

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Box
                component={Link}
                to={currentPage.link}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                        opacity: 0.8,
                    },
                }}
            >
                <FontAwesomeIcon icon={currentPage.icon} style={{ fontSize: '16px', marginRight: '8px' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                    {currentPage.name}
                </Typography>
            </Box>
        </Box>
    );
}
