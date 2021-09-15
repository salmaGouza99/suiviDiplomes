import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import logo from '../../Images/logoFsjes.png';
import Typography from '@material-ui/core/Typography';

export default class Bordoreau extends React.PureComponent {
    constructor(props) {
        super(props);
        // States
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

        // set the numbers of Diplomes according to the type and filiere

        this.setState({
            deugDroitArabe: this.props.diplomesList?.filter((diplome) =>
                diplome.type_demande === "DEUG" &&
                diplome.filiere.toLowerCase().includes("القانون باللغة العربية".toLocaleLowerCase())
            )
        });
        this.setState({
            deugDroitfrancais: this.props.diplomesList?.filter((diplome) =>
                diplome.type_demande === "DEUG" &&
                diplome.filiere.toLowerCase().includes("Droit en français".toLocaleLowerCase())
            )
        });
        this.setState({
            deugEconomie: this.props.diplomesList?.filter((diplome) =>
                diplome.type_demande === "DEUG" &&
                diplome.filiere.toLowerCase().includes("Sciences Economiques et Gestion".toLocaleLowerCase())
            )
        });
        this.setState({
            licenceDroitArabe: this.props.diplomesList?.filter((diplome) =>
                diplome.type_demande === "Licence" &&
                diplome.filiere.toLowerCase().includes("القانون باللغة العربية".toLocaleLowerCase())
            )
        });
        this.setState({
            licenceDroitfrancais: this.props.diplomesList?.filter((diplome) =>
                diplome.type_demande === "Licence" &&
                diplome.filiere.toLowerCase().includes("Droit en français".toLocaleLowerCase())
            )
        });
        this.setState({
            licenceEconomie: this.props.diplomesList?.filter((diplome) =>
                diplome.type_demande === "Licence" &&
                diplome.filiere.toLowerCase().includes("Sciences Economiques et Gestion".toLocaleLowerCase())
            )
        });
    }

    render() {
        return (
            <div>
                <br></br>
                <Grid container direction="row" justifyContent="space-around" 
                    alignItems="center" style={{marginLeft: 15}}>
                    <Grid item >
                        <div style={{ textAlign: "center" }}>
                            <Typography variant="body" component="h4">ⵜⴰⵙⴷⴰⵡⵉⵜⵎⵓⵃⴰⵎⴷⴸ - ⵔⴱⴰⴹ</Typography>
                            <Typography variant="body" component="h4" >ⵜⴰⵙⵖⵉⵡⴰⵏⵜ ⵏ ⵜⵎⵓⵙⵏⵉⵏⵉⵣⵔⴼⴰⵏⵉⵏ,</Typography>
                            <Typography variant="body" component="h4" >ⵜⵉⴷⴰⵎⵙⴰⵏⵉⵏ ⴷ ⵜⵉⵏⴰⵎⵓⵏⵉⵏ</Typography>
                            <Typography variant="body" component="h4" >ⴰⴳⴷⴰⵍ</Typography>
                        </div>
                    </Grid>
                    <Grid item style={{ marginLeft:-50, marginRight:-50 }}>
                        <img src={`${logo}`} style={{marginTop: 25}}/>
                    </Grid>
                    <Grid item >
                        <div style={{ textAlign: "center", marginTop:-20 }}>
                            <br />
                            <Typography variant="body" component="h3" >جامعة محمد الخامس الرباط</Typography>
                            <Typography variant="body" component="h3" > كلية العلوم القانونية والاقتصادية والاجتماعية</Typography>
                            <Typography variant="body" component="h3" > أكدال</Typography>
                        </div>
                    </Grid>
                </Grid>
                <Grid container justifyContent="space-around">
                    <Typography variant="body" component="h4" style={{marginTop: -5}}>
                        Université Mohammed V Rabat Faculté des sciences Juridiques,
                             Economiques et Sociales - Agdal</Typography>
                </Grid>
                <br></br><br></br>
                <Grid container justifyContent="space-around">
                    <div style={{ textAlign: "center" }}>
                        <Typography component="h3" variant="body">من السيد</Typography>
                        <Typography component="h3" variant="body"> عميد كلية العلوم القانونية والاقتصادية والاجتماعية أكدال</Typography>
                        <br></br>
                        <Typography component="h3" variant="body">الى السيد</Typography>
                        <Typography component="h3" variant="body">رئيس جامعة محمد الخامس الرباط</Typography>
                        <br></br>
                        <Typography component="h3" variant="body">ورقة الإرسال</Typography>
                        <br></br>
                    </div>
                </Grid>
                    <div style={{marginRight: 30}}>
                        <div align='right' style ={{marginRight: 40, marginBottom: -22}}>
                            <Tooltip title="Numéro du bordoreau"> 
                                <input type="text" defaultValue='. . .' style={{width: 100, borderColor: "Transparent", textAlign: 'right'}}/>
                            </Tooltip>
                        </div>
                        <Typography component="h3" variant="body" align='right'>: الرقم</Typography>
                    </div>
                <Grid container justifyContent="space-around">
                <div style={{ paddingTop: 6, paddingBottom: 60}}>
                    <table style={{borderCollapse: 'collapse'}}>
                        <thead  style={{ textAlign: "center" }}>
                            <tr >
                                <th scope="col" style={{paddingTop: 7, paddingLeft: 40, paddingRight: 40, border: '1px solid', fontSize: 19, fontWeight: 'bolder'}}>الملاحظات</th>
                                <th scope="col" style={{border: '1px solid', fontSize: 19, fontWeight: 'bolder'}}>العدد</th>
                                <th scope="col" style={{border: '1px solid',paddingLeft: 120, paddingRight: 120, fontSize: 19, fontWeight: 'bolder'}}>نوع المراسلات وتلخيص موضوعها</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "right"}}>
                            <tr style={{paddingTop: 20}}>
                                <td rowspan="7" style={{padding: 15, borderLeft: '1px solid', fontSize: 17, borderRight: '1px solid', borderBottom: '1px solid'}}>
                                    <Tooltip title="Remarques"> 
                                            <textarea name="textarea" rows="10" cols="20" style={{fontSize: 17, borderColor: "Transparent", textAlign: 'right'}}> 
                                                تبعث إليكم للاختصاص	
                                            </textarea>
                                    </Tooltip>
                                 </td>
                                <td style={{borderRight: '1px solid', borderLeft: '1px solid'}}> </td>
                                <td style={{fontWeight: 'bold', padding: 15, borderRight: '1px solid', fontSize: 17}}>: تجدون طيه</td>
                            </tr>
                            <tr>
                                <td style={{borderLeft: '1px solid'}}></td>
                                <td style={{borderRight: '1px solid', borderLeft: '1px solid'}}></td>
                                <td style={{borderRight: '1px solid'}}></td>
                            </tr>


                            {/* ////////////////////// Licence ////////////////////// */}
                            {this.state.licenceDroitArabe.length !== 0 ?
                                <tr>
                                    <td align='center' style={{padding: 15, borderRight: '1px solid', fontSize: 17}}>{this.state.licenceDroitArabe.length >= 1 && this.state.licenceDroitArabe.length <= 9 ?
                                        '0'+this.state.licenceDroitArabe.length : this.state.licenceDroitArabe.length}</td>
                                    <td style={{padding: 15, borderRight: '1px solid'}} >
                                        <div style={{ fontWeight: 'bold', fontSize: 17 }}>
                                         : {this.state.licenceDroitArabe.length === 1 ? ' شهادة ' : this.state.licenceDroitArabe.length === 2 ? ' شهادتي ' : ' شهادات '}
                                         الإجازة في الدراسات الأساسية في القانون بالعربية
                                         {this.state.licenceDroitArabe.length === 2 ? ' تخصان ' : ' تخص '}
                                         {this.state.licenceDroitArabe.length === 1 ? ' الطالب ' : this.state.licenceDroitArabe.length === 2 ? ' الطالبين ' : ' الطلبة '} 
                                        </div>
                                        {
                                            this.state.licenceDroitArabe.map((element) => (
                                                <div style={{ marginRight: "70px", fontSize: 17 }}> {element.nom_arabe} {element.prenom_arabe}    - </div>
                                            ))
                                        }
                                    </td>
                                </tr> : <></>
                            }
                            {this.state.licenceDroitfrancais.length !== 0 ?
                                <tr>
                                    <td align='center' style={{padding: 15, borderRight: '1px solid', fontSize: 17}}>{this.state.licenceDroitfrancais.length >= 1 && this.state.licenceDroitfrancais.length <= 9 ?
                                        '0'+this.state.licenceDroitfrancais.length : this.state.licenceDroitfrancais.length}</td>
                                    <td style={{padding: 15, borderRight: '1px solid'}} >
                                        <div style={{ fontWeight: 'bold', fontSize: 17 }}>
                                        : {this.state.licenceDroitfrancais.length === 1 ? ' شهادة ' : this.state.licenceDroitfrancais.length === 2 ? ' شهادتي ' : ' شهادات '}
                                         الإجازة في الدراسات الأساسية في القانون بالفرنسية
                                         {this.state.licenceDroitfrancais.length === 2 ? ' تخصان ' : ' تخص '}
                                         {this.state.licenceDroitfrancais.length === 1 ? ' الطالب ' : this.state.licenceDroitfrancais.length === 2 ? ' الطالبين ' : ' الطلبة '} 
                                        </div>
                                        {
                                            this.state.licenceDroitfrancais.map((element) => (
                                                <div style={{ marginRight: "70px", fontSize: 17 }}> {element.nom_arabe} {element.prenom_arabe}    - </div>
                                            ))
                                        }
                                    </td>
                                </tr> : <></>
                            }
                            {this.state.licenceEconomie.length !== 0 ?
                                <tr>
                                    <td align='center' style={{padding: 15, borderRight: '1px solid', fontSize: 17}}>{this.state.licenceEconomie.length >= 1 && this.state.licenceEconomie.length <= 9 ?
                                        '0'+this.state.licenceEconomie.length : this.state.licenceEconomie.length}</td>
                                    <td style={{padding: 15, borderRight: '1px solid'}} >
                                        <div style={{ fontWeight: 'bold', fontSize: 17 }}>
                                        : {this.state.licenceEconomie.length === 1 ? ' شهادة ' : this.state.licenceEconomie.length === 2 ? ' شهادتي ' : ' شهادات '}
                                         الإجازة في الدراسات الأساسية في العلوم الاقتصادية والتسيير
                                         {this.state.licenceEconomie.length === 2 ? ' تخصان ' : ' تخص '}
                                         {this.state.licenceEconomie.length === 1 ? ' الطالب ' : this.state.licenceEconomie.length === 2 ? ' الطالبين ' : ' الطلبة '}  
                                        </div>
                                        {
                                            this.state.licenceEconomie.map((element) => (
                                                <div style={{ marginRight: "70px", fontSize: 17 }}> {element.nom_arabe} {element.prenom_arabe}    - </div>
                                            ))
                                        }
                                    </td>
                                </tr> : <></>
                            }

                            {/* ////////////////////// DEUG ////////////////////// */}
                            {this.state.deugDroitArabe.length !== 0 ?
                                <tr>
                                    <td align='center' style={{padding: 15, borderRight: '1px solid', fontSize: 17}} >{this.state.deugDroitArabe.length >= 1 && this.state.deugDroitArabe.length <= 9 ?
                                        '0'+this.state.deugDroitArabe.length : this.state.deugDroitArabe.length}</td>
                                    <td style={{padding: 15, borderRight: '1px solid'}}>
                                        <div style={{ fontWeight: 'bold', fontSize: 17}}>
                                        : {this.state.deugDroitArabe.length === 1 ? ' دبلوم ' : this.state.deugDroitArabe.length === 2 ? ' دبلومي ' : ' دبلومات '}
                                         الدراسات الجامعية العامة في القانون بالعربية 
                                         {this.state.deugDroitArabe.length === 1 ? ' يخص ' : this.state.deugDroitArabe.length === 2 ? ' يخصان ' : ' تخص '}
                                         {this.state.deugDroitArabe.length === 1 ? ' الطالب ' : this.state.deugDroitArabe.length === 2 ? ' الطالبين ' : ' الطلبة '} 
                                         </div>
                                        {
                                            this.state.deugDroitArabe.map((element) => (
                                                <div style={{ marginRight: "70px", fontSize: 17 }}>{element.nom_arabe} {element.prenom_arabe}    - </div>
                                            ))
                                        }

                                    </td>
                                </tr> : <></>
                            }
                            {this.state.deugDroitfrancais.length !== 0 ?
                                <tr>
                                    <td align='center' style={{padding: 15, borderRight: '1px solid', fontSize: 17}}>{this.state.deugDroitfrancais.length >= 1 && this.state.deugDroitfrancais.length <= 9 ?
                                        '0'+this.state.deugDroitfrancais.length : this.state.deugDroitfrancais.length}</td>
                                    <td style={{padding: 15, borderRight: '1px solid'}}>
                                        <div style={{ fontWeight: 'bold', fontSize: 17 }}>
                                        : {this.state.deugDroitfrancais.length === 1 ? ' دبلوم ' : this.state.deugDroitfrancais.length === 2 ? ' دبلومي ' : ' دبلومات '}
                                         الدراسات الجامعية العامة في القانون بالفرنسية 
                                         {this.state.deugDroitfrancais.length === 1 ? ' يخص ' : this.state.deugDroitfrancais.length === 2 ? ' يخصان ' : ' تخص '}
                                         {this.state.deugDroitfrancais.length === 1 ? ' الطالب ' : this.state.deugDroitfrancais.length === 2 ? ' الطالبين ' : ' الطلبة '} 
                                         </div>
                                        {
                                            this.state.deugDroitfrancais.map((element) => (
                                                <div style={{ marginRight: "70px", fontSize: 17 }}> {element.nom_arabe} {element.prenom_arabe}    - </div>
                                            ))
                                        }
                                    </td>
                                </tr> : <></>
                            }
                            {this.state.deugEconomie.length !== 0 ?
                                <tr>
                                    <td align='center' style={{padding: 15, borderRight: '1px solid', fontSize: 17}}>{this.state.deugEconomie.length >= 1 && this.state.deugEconomie.length <= 9 ?
                                        '0'+this.state.deugEconomie.length : this.state.deugEconomie.length}</td>
                                    <td style={{padding: 15, borderRight: '1px solid'}}>
                                        <div style={{ fontWeight: 'bold', fontSize: 17 }}>
                                        : {this.state.deugEconomie.length === 1 ? ' دبلوم ' : this.state.deugEconomie.length === 2 ? ' دبلومي ' : ' دبلومات '}
                                         الدراسات الجامعية العامة في العلوم الاقتصادية والتسيير 
                                         {this.state.deugEconomie.length === 1 ? ' يخص ' : this.state.deugEconomie.length === 2 ? ' يخصان ' : ' تخص '}
                                         {this.state.deugEconomie.length === 1 ? ' الطالب ' : this.state.deugEconomie.length === 2 ? ' الطالبين ' : ' الطلبة '} 
                                         </div>
                                        {
                                            this.state.deugEconomie.map((element) => (
                                                <div style={{ marginRight: "70px", fontSize: 17 }}> {element.nom_arabe} {element.prenom_arabe}    - </div>
                                            ))
                                        }

                                    </td>
                                </tr> : <></>
                            }

                            <tr>
                                <td style={{borderRight: '1px solid', borderBottom: '1px solid', padding: 30}}></td>
                                <td style={{borderRight: '1px solid', borderBottom: '1px solid'}}></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </Grid>
            </div>  
        );
    }
}