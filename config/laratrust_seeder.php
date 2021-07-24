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
        'admin' => [
            'profile' => 'r,u',
            'users' => 'c,r,u,d',
            'formulaires' => 'c,r,u,d',
            'etudiants' => 'r,u',
            'demandes' => 'r',
            'diplomes' => 'r,u,d',
            'diplomes_reedites' => 'r,u,d',
            'roles' => 'c,r,u,d',
            'permissions' => 'c,r,u,d',
        ],
        'guichet_droit_arabe' => [
            'profile' => 'r,u',
            'etudiants' => 'r',
            'demandes' => 'r',
            'diplomes' => 'c,r,u'
        ],
        'guichet_droit_francais' => [
            'profile' => 'r,u',
            'etudiants' => 'r',
            'demandes' => 'r',
            'diplomes' => 'c,r,u'
        ],  
        'guichet_economie' => [
            'profile' => 'r,u',
            'etudiants' => 'r',
            'demandes' => 'r',
            'diplomes' => 'c,r,u'
        ],
        'service_diplomes' => [
            'profile' => 'r,u',
            'etudiants' => 'r,u',
            'diplomes' => 'r',
            'diplomes_reedites' => 'c,r,u'
        ],
        'decanat' => [
            'profile' => 'r,u',
            'etudiants' => 'r',
            'diplomes' => 'r,u'
        ],
        'bureau_ordre' => [
            'profile' => 'r,u',
            'etudiants' => 'r',
            'diplomes' => 'r,u'
        ],
        'guichet_retrait' => [
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
