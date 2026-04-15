// This file acts as our "Database"
// You can easily update this list manually without touching the logic

const PORTAL_CONTENT = {
    sops: [
        {
            id: 'sop-home-inspection',
            title: 'Standard Home Inspection Process',
            division: 'Home Inspection',
            description: 'The step-by-step required process for executing a residential home inspection.',
            filename: 'sops/home-inspection/home-inspection.md',
            date: '2026-04-10'
        },
        {
            id: 'sop-fortified-photos',
            title: 'Required Photos for FORTIFIED',
            division: 'FORTIFIED',
            description: 'Checklist of the absolute minimum photos required for IBHS certification.',
            filename: 'sops/fortified/required-photos.md',
            date: '2026-04-14'
        },
        {
            id: 'sop-fortified-fails',
            title: 'Common FORTIFIED Fail Points',
            division: 'FORTIFIED',
            description: 'A guide on how to spot nailing and sealant mistakes made by contractors.',
            filename: 'sops/fortified/common-fail-points.md',
            date: '2026-04-14'
        },
        {
            id: 'sop-office-admin',
            title: 'New Client Intake & Scheduling',
            division: 'Admin',
            description: 'How to process a new lead and schedule an inspection in ISN.',
            filename: 'sops/admin/office-admin.md',
            date: '2026-04-14'
        }
    ],
    videos: [
        {
            id: 'vid-drone-safety',
            title: 'Drone Roof Inspection Training',
            description: 'How to safely operate the DJI drone during high-slope roof inspections.',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
            thumbnail: 'https://images.unsplash.com/photo-1579822604928-89fa242ca4b1?q=80&w=600&auto=format&fit=crop',
            date: '2026-04-01'
        },
        {
            id: 'vid-wind-mit',
            title: 'Perfect Wind Mitigation Report',
            description: 'A walkthrough on filling out the OIR-B1-1802 completely and accurately.',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop',
            date: '2026-04-05'
        }
    ]
};
