import { useState } from 'react';
import ShiftBarIcon from '../RightPanelBox/assets/ShiftBarIcon';
import ExpandIcon from '../RightPanelBox/assets/ExpandIcon';
import StarAddIcon from '../RightPanelBox/assets/StarIcon';
import TrashAddIcon from '../RightPanelBox/assets/TrashIcon';

import {
    RightPanelWrapper,
    Header,
    HeaderContent,
    Title,
    Subtitle,
    Actions,
    IconButton,
    SiteList,
    SiteItem,
    SiteRow,
    SiteInfo,
    SiteName,
    SiteLocation,
    SiteActions,
    BadgeWrapper,
    Badge,
    TrashButton,
    ChevronIcon,
    Dropdown,
} from './index.styled';

const sites = [
    { id: '1', name: 'Site 123', location: ['Seattle', 'West', 'Northwest'], status: { text: '183d left', variant: 'urgent' }, hasDelete: true },
    { id: '2', name: 'Site 123', location: ['Seattle', 'West', 'Northwest'], status: { text: '2y left', variant: 'available' }, hasDelete: true },
    { id: '3', name: 'Site 123', location: ['Seattle', 'West', 'Northwest'], status: { text: '183d left', variant: 'urgent' }, hasDelete: true },
    { id: '4', name: 'Site ABCD1234', location: ['Seattle', 'West', 'Northwest'], status: { text: '183d left', variant: 'urgent' }, hasDelete: true },
    { id: '5', name: 'Site 123', location: ['Seattle', 'West', 'Northwest'], status: { text: '183d left', variant: 'urgent' }, hasDelete: true },
];


export const SelectedSites = () => {
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const toggleDropdown = (id) => {
        setOpenDropdownId(prev => (prev === id ? null : id));
    };

    return (
        <RightPanelWrapper>
            <Header>
                <HeaderContent>
                    <Title>Selected Sites</Title>
                    <Subtitle>View and manage chosen sites</Subtitle>
                </HeaderContent>
                <Actions>
                    <IconButton><ShiftBarIcon /></IconButton>
                    <IconButton><StarAddIcon /></IconButton>
                    <IconButton><ExpandIcon /></IconButton>
                </Actions>
            </Header>

            <SiteList>
                {sites.map((site) => {
                    const isOpen = openDropdownId === site.id;
                    return (
                        <SiteItem key={site.id} className={isOpen ? 'open' : ''}>
                            <SiteRow onClick={() => toggleDropdown(site.id)}>
                                <SiteInfo>
                                    <SiteName>{site.name}</SiteName>
                                    <SiteLocation>{site.location.join(' > ')}</SiteLocation>
                                </SiteInfo>

                                <SiteActions>
                                    {site.status && (
                                        <BadgeWrapper>
                                            <Badge variant={site.status.variant}>{site.status.text}</Badge>
                                            <TrashButton onClick={(e) => { e.stopPropagation(); console.log(`Delete ${site.id}`); }}>
                                                <TrashAddIcon />
                                            </TrashButton>
                                        </BadgeWrapper>
                                    )}
                                    <ChevronIcon className={isOpen ? 'open' : ''} />
                                </SiteActions>
                            </SiteRow>

                            {isOpen && (
                                <Dropdown>
                                    <div>View Details</div>
                                    <div>Edit Site</div>
                                    <div>Share Link</div>
                                </Dropdown>
                            )}
                        </SiteItem>
                    );
                })}
            </SiteList>
        </RightPanelWrapper>
    );
};
