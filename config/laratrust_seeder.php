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
            'formulaires' => 'c,r,u,d',
            'etudiants' => 'r,u',
            'demandes' => 'r',
            'diplomes' => 'r,u,d',
            'diplomes_reedites' => 'r,u,d',
            'roles' => 'c,r,u,d',
            'permissions' => 'c,r,u,d',
        ],
        'Guichet Droit Arabe' => [
            'profile' => 'r,u',
            'etudiants' => 'r',
            'demandes' => 'r',
            'diplomes' => 'c,r,u'
        ],
        'Guichet Droit Francais' => [
            'profile' => 'r,u',
            'etudiants' => 'r',
            'demandes' => 'r',
            'diplomes' => 'c,r,u'
        ],  
        'Guichet Economie' => [
            'profile' => 'r,u',
            'etudiants' => 'r',
            'demandes' => 'r',
            'diplomes' => 'c,r,u'
        ],
        'Service de Diplômes' => [
            'profile' => 'r,u',
            'etudiants' => 'r,u',
            'diplomes' => 'r',
            'diplomes_reedites' => 'c,r,u'
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
