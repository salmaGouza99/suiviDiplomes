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
        'superadministrateur' => [
            'users' => 'c,r,u,d',
            'formulaires' => 'c,r,u,d',
            'etudiants' => 'r,u',
            'demandes' => 'r',
            'profile' => 'r,u',
            'permissions' => 'r,u,d',
        ],
        'guichet_droit_arabe' => [
            'etudiants' => 'r',
            'demandes' => 'r,u',
            'diplomes' => 'c,r,u'
        ],
        'guichet_droit_francais' => [
            'etudiants' => 'r',
            'demandes' => 'r,u,d',
            'diplomes' => 'c,r,u'
        ],  
        'guichet_economie' => [
            'etudiants' => 'r',
            'demandes' => 'r,u,d',
            'diplomes' => 'c,r,u'
        ],
        'service_diplomes' => [
            'etudiants' => 'r,u',
            'diplomes' => 'r,u',
            'diplomes_reedites' => 'c,r,u,d'
        ],
        'decanat' => [
            'etudiants' => 'r,u',
            'diplomes' => 'r,u'
        ],
        'bureau_ordre' => [
            'etudiants' => 'r',
            'diplomes' => 'r,u'
        ],
        'guichet_retrait' => [
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
