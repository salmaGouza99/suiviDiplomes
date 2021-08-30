import React from 'react';
import FicheEtudiant from './FicheEtudiant';

export default class RenderFiche extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <FicheEtudiant etudiantId={this.props?.etudiantId} load={this.props?.load}/>
            </div>
        );
    }
}

