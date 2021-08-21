import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../logoFsjes.png'
import userService from "../../Services/userService";
import 'bootstrap/dist/css/bootstrap.css';

export default class BordereauPdf extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            deugDroitArabe: [],
            deugDroitfrancais: [],
            deugEconomie: [],
            licenceDroitArabe: [],
            licenceDroitfrancais: [],
            licenceEconomie: [],
        };
    }

    componentDidMount() {
        this.setState({
            deugDroitArabe: this.props.diplomesList?.filter((diplome) =>
                diplome.type_demande === "DEUG" &&
                diplome.filiere.toLowerCase().includes("Droit Arabe".toLocaleLowerCase())
            )
        });


        this.setState({
            deugDroitfrancais: this.props.diplomesList?.filter((diplome) =>
                diplome.type_demande === "DEUG" &&
                diplome.filiere.toLowerCase().includes("Droit Français".toLocaleLowerCase())
            )
        });
        this.setState({
            deugEconomie: this.props.diplomesList?.filter((diplome) =>
                diplome.type_demande === "DEUG" &&
                diplome.filiere.toLowerCase().includes("Economie et gestion".toLocaleLowerCase())
            )
        });
        this.setState({
            licenceDroitArabe: this.props.diplomesList?.filter((diplome) =>
                diplome.type_demande === "licence" &&
                diplome.filiere.toLowerCase().includes("Droit Arabe".toLocaleLowerCase())
            )
        });
        this.setState({
            licenceDroitfrancais: this.props.diplomesList?.filter((diplome) =>
                diplome.type_demande === "DEUG" &&
                diplome.filiere.toLowerCase().includes("Droit Français".toLocaleLowerCase())
            )
        });
        this.setState({
            licenceEconomie: this.props.diplomesList?.filter((diplome) =>
                diplome.type_demande === "licence" &&
                diplome.filiere.toLowerCase().includes("Economie et gestion".toLocaleLowerCase())
            )
        });

    }




    render() {
        return (
            <div className="container-fluid">
                {/* <div style={{ textAlign: "center" }}>
                <img src={`${header}`} width="900" />
             </div> */}
                <br></br><br></br>
                <Grid container justifyContent="space-around"
                    alignItems="center" direction="row"
                >
                    <Grid>
                        <div style={{ textAlign: "center" }}>
                            <br />
                            <h6>ⵜⴰⵙⴷⴰⵡⵉⵜⵎⵓⵃⴰⵎⴷⴸ - ⵔⴱⴰⴹ</h6>
                            <h6>ⵜⴰⵙⵖⵉⵡⴰⵏⵜ ⵏ ⵜⵎⵓⵙⵏⵉⵏⵉⵣⵔⴼⴰⵏⵉⵏ, </h6>
                            <h6>ⵜⵉⴷⴰⵎⵙⴰⵏⵉⵏ ⴷ ⵜⵉⵏⴰⵎⵓⵏⵉⵏ</h6>
                            <h6>ⴰⴳⴷⴰⵍ</h6>
                        </div>
                    </Grid>

                    <Grid item>
                        <img src={`${logo}`} />
                    </Grid>
                    <Grid item >
                        <div style={{ textAlign: "center" }}>
                            <br />
                            <h5 >جامعة محمد الخامس الرباط</h5>
                            <h5>كلية العلوم القانونية والاقتصادية </h5>
                            <h5> والاجتماعية أكدال</h5>
                        </div>
                    </Grid>
                    <div>
                        <p >Université Mohammed V Rabat Faculté des sciences Juridiques, Economiques et Sociales - Agdal</p>
                        {/* <h6>Faculté des sciences Juridiques, Economiques et Sociales - Agdal</h6> */}
                    </div>
                </Grid>
                <br></br><br></br>
                <div style={{ textAlign: "center" }}>
                    <h6>من السيد عميد كلية العلوم القانونية والاقتصادية والاجتماعية أكدال</h6>
                    <h6 >الى السيد رئيس جامعة محمد الخامس الرباط</h6><br></br>
                    <h6 >ورقة الارسال</h6><br></br>
                </div>

                <div style={{ textAlign: "right" }} >
                    <input type="text" style={{ display: "inline", borderColor: "Transparent", width: "40px" }} />
                    <h6 style={{ display: "inline", paddingRight: "35px" }}>    :  الرقم</h6>
                </div>
                <div style={{ padding: "30px"}}>
                    <table className="table table-bordered " >
                        <thead  style={{ textAlign: "center" }}>
                            <tr >
                                <th scope="col">الملاحظات</th>
                                <th scope="col">العدد</th>
                                <th scope="col">نوع المراسلات وتلخيص موضوعها</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "right" }}>
                            {this.state.deugDroitArabe.length !== 0 ?
                                <tr>
                                    <td rowspan="6" >
                                        <textarea style={{
                                            width: "100%",
                                            height: "100%",
                                            borderColor: "Transparent",
                                            textAlign: "center"

                                        }}></textarea>
                                    </td>
                                    <td>{this.state.deugDroitArabe.length}</td>
                                    <td style={{ fontWeight: 'bold' }}>
                                        : دبلومات الدراسات الجامعية العامة في القانون بالعربية تخص الطلبة
                                        {
                                            this.state.deugDroitArabe.map((element) => (
                                                <div style={{ marginRight: "70px" }}>{element.nom_arabe} {element.prenom_arabe} - </div>
                                            ))
                                        }

                                    </td>
                                </tr> : <></>
                            }
                            {this.state.deugDroitfrancais.length !== 0 ?
                                <tr>
                                    <td rowspan="6" >
                                        <textarea style={{
                                            width: "100%",
                                            height: "100%",
                                            borderColor: "Transparent",
                                            textAlign: "center"
                                        }}></textarea>

                                    </td>
                                    <td>{this.state.deugDroitfrancais.length}</td>
                                    <td >

                                        <div style={{ fontWeight: 'bold' }}>   :  دبلومات الدراسات الجامعية العامة في القانون بالفرنسية تخص الطلبة</div>
                                        {
                                            this.state.deugDroitfrancais.map((element) => (
                                                <div style={{ marginRight: "70px" }}> {element.nom_arabe} {element.prenom_arabe} - </div>
                                            ))
                                        }
                                    </td>
                                </tr> : <></>
                            }
                            {this.state.deugEconomie.length !== 0 ?
                                <tr>
                                    <td>{this.state.deugEconomie.length}</td>
                                    <td>
                                        <div style={{ fontWeight: 'bold' }}>: دبلومات الدراسات الجامعية العامة في الاقتصاد والتسيير تخص الطلبة</div>
                                        {
                                            this.state.deugEconomie.map((element) => (
                                                <div style={{ marginRight: "70px" }}> {element.nom_arabe} {element.prenom_arabe} - </div>
                                            ))
                                        }

                                    </td>
                                </tr> : <></>
                            }


                            {this.state.licenceDroitArabe.length !== 0 ?
                                <tr>
                                    <td>{this.state.licenceDroitArabe.length}</td>
                                    <td >
                                        <div style={{ fontWeight: 'bold' }}>: شهادات الاجازة فالدراسات الاساسية في القانون بالعربية تخص الطلبة</div>
                                        {
                                            this.state.licenceDroitArabe.map((element) => (
                                                <div style={{ marginRight: "70px" }}> {element.nom_arabe} {element.prenom_arabe} - </div>
                                            ))
                                        }
                                    </td>
                                </tr> : <></>
                            }

                            {this.state.licenceDroitfrancais.length !== 0 ?
                                <tr>
                                    <td>{this.state.licenceDroitfrancais.length}</td>
                                    <td >
                                        <div style={{ fontWeight: 'bold' }}> : شهادات الاجازة فالدراسات الاساسية في القانون بالفرنسية تخص الطلبة</div>
                                        {
                                            this.state.licenceDroitfrancais.map((element) => (
                                                <div style={{ marginRight: "70px" }}> {element.nom_arabe} {element.prenom_arabe} - </div>
                                            ))
                                        }
                                    </td>
                                </tr> : <></>
                            }


                            {this.state.licenceEconomie.length !== 0 ?
                                <tr>
                                    <td>{this.state.licenceEconomie.length}</td>
                                    <td >
                                        <div style={{ fontWeight: 'bold' }}> : شهادات الاجازة فالدراسات الاساسية في الاقتصاد والتسيير تخص الطلبة</div>
                                        {
                                            this.state.licenceEconomie.map((element) => (
                                                <div style={{ marginRight: "70px" }}> {element.nom_arabe} {element.prenom_arabe} - </div>
                                            ))
                                        }
                                    </td>
                                </tr> : <></>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}