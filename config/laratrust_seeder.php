<?php

return [
    /**
     * Control if the seeder should create a user per role while seeding the data.
     */
    'create_users' => false,

    /**
     * Control if all the laratrust tables should be truncated before running the seeder.
     */
    'truncate_tables' => true,

    'roles_structure' => [
        'Admin' => [
            'profile' => 'r,u',
            'users' => 'c,r,u,d',
            'formulaires' => 'r,u',
            'etudiants' => 'r',
            'demandes' => 'r',
            'diplomes' => 'r',
        ],
        'Guichet Droit Arabe' => [
            'profile' => 'r,u',
            'etudiants' => 'r',
            'demandes' => 'r',
            'diplomes' => 'c,r'
        ],
        'Guichet Droit Français' => [
            'profile' => 'r,u',
            'etudiants' => 'r',
            'demandes' => 'r',
            'diplomes' => 'c,r'
        ],  
        'Guichet Economie' => [
            'profile' => 'r,u',
            'etudiants' => 'r',
            'demandes' => 'r',
            'diplomes' => 'c,r'
        ],
        'Service de Diplômes' => [
            'profile' => 'r,u',
            'etudiants' => 'r,u',
            'diplomes' => 'r,u',
        ],
        'Décanat' => [
            'profile' => 'r,u',
            'etudiants' => 'r',
            'diplomes' => 'r,u'
        ],
        'Bureau d\'Ordre' => [
            'profile' => 'r,u',
            'etudiants' => 'r',
            'diplomes' => 'r,u'
        ],
        'Guichet de Retrait' => [
            'profile' => 'r,u',
            'etudiants' => 'r',
            'diplomes' => 'r,u'
        ]
    ],

    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete'
    ]
];
