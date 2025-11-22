import React from 'react';
import { Box, Typography, Breadcrumbs, Link, Divider } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';

export default function PageHeader({ title, breadcrumbs, action }) {
    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            fontSize: '1.75rem',
                            color: 'text.primary',
                            mb: 1,
                        }}
                    >
                        {title}
                    </Typography>
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            sx={{
                                '& .MuiBreadcrumbs-ol': {
                                    alignItems: 'flex-end',
                                },
                                '& .MuiBreadcrumbs-separator': {
                                    mx: 1,
                                },
                            }}
                        >
                            {breadcrumbs.map((crumb, index) => {
                                if (index === breadcrumbs.length - 1) {
                                    return (
                                        <Typography key={index} color="text.primary" sx={{ fontSize: '0.875rem' }}>
                                            {crumb.label}
                                        </Typography>
                                    );
                                }
                                return (
                                    <Link
                                        key={index}
                                        component="button"
                                        variant="body2"
                                        onClick={crumb.onClick}
                                        sx={{
                                            color: 'primary.main',
                                            textDecoration: 'none',
                                            fontSize: '0.875rem',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        {crumb.label}
                                    </Link>
                                );
                            })}
                        </Breadcrumbs>
                    )}
                </Box>
                {action && <Box sx={{ ml: 2 }}>{action}</Box>}
            </Box>
            <Divider />
        </Box>
    );
}
