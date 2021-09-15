import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import um5_logo from '../../Images/um5_logo.jpg';
import fsjes_logo from '../../Images/fsjes_logo.jpg';

export default class NotePresentation extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    
    // render the NotePresentation filled with the updated student info and his diploma
    render() {
        return (
        <div style={{marginBottom:-30}}>
            <br></br>
            <Typography component="h3" variant="body" style={{marginLeft: 35}}>  
                Annexe 3 : Note de présentation en cas de réédition de diplôme contenant une erreur
            </Typography>
            <br></br>
            <div style={{marginRight: 50, marginLeft: 50, border: '3px solid', padding: 20}}>
                <Grid container direction="row" justifyContent="space-around" 
                    alignItems="center" style={{marginLeft: 10}}>
                    <Grid item >
                        <img src={`${fsjes_logo}`} width={140} height={120} />
                        <img src={`${um5_logo}`} width={150} height={110} style={{marginBottom: -7}}/>
                    </Grid>
                </Grid>
                <br></br>
                <Grid container justifyContent="space-around">
                    <div style={{ textAlign: "center", marginTop: 15}}>
                        <Typography component="h2" variant="body">من عميد الكلية</Typography>
                        <Typography component="h2" variant="body">إلى </Typography>
                        <Typography component="h2" variant="body">السيد رئيس جامعة محمد الخامس - الرباط</Typography>
                    </div>
                </Grid>
                        <div>
                            <br></br><br></br>
                            <Typography style={{ fontSize: 20 }} align='right'> 
                                 <span style={{fontWeight: "bold"}}> الموضوع : </span>
                                 <span > رسالة تقديم </span>
                            </Typography>
                            <br></br><br></br>
                            <Typography style={{ fontSize: 20, marginBottom: 10 }} align='right'> يشرفني أن أبلغ سيادتكم أن السيد(ة) : 
                                 <span style={{fontWeight: "bold", marginLeft: 10, marginRight: 10}}> {this.props?.diplome?.nom_arabe} {this.props?.diplome?.prenom_arabe}  </span>
                            </Typography>
                            <Typography style={{ fontSize: 20, marginBottom: 10 }} align='right'> 
                                المزداد بتاريخ : 
                                 <span style={{fontWeight: "bold", marginLeft: 40, marginRight: 15}}>
                                      {this.props?.diplome?.date_naiss?.split('-')[2]+'/'+this.props?.diplome?.date_naiss?.split('-')[1]+'/'+this.props?.diplome?.date_naiss?.split('-')[0]} 
                                </span> 
                                ب <span style={{fontWeight: "bold", marginLeft: 30, marginRight: 10}}> {this.props?.diplome?.lieu_naiss} </span>  
                            </Typography>
                            <Typography style={{ fontSize: 20, marginBottom: 10}} align='right'>  
                                 <span style={{fontWeight: "bold", marginLeft: 10, marginRight: 10}}> {this.props?.diplome?.cin} </span>
                                 : رقم البطاقة الوطنية  
                            </Typography>
                            <Typography style={{ fontSize: 20, marginBottom: 10}} align='right'>  
                                 <span style={{fontWeight: "bold", marginLeft: 10, marginRight: 10}}> {this.props?.diplome?.cne} </span>
                                 : الرقم الوطني للطالب / مسار  
                            </Typography>
                            <Typography style={{ fontSize: 20, marginBottom: 10}} align='right'>
                                 قد تابع دراسته ب
                                 <span style={{fontWeight: "bold", marginLeft: 10, marginRight: 10}}>  كلية العلوم القانونية والاقتصادية والاجتماعية أكدال  </span>
                                 <span style={{marginLeft: 10}}> و حصل على دبلوم  </span>
                                  <span style={{fontWeight: "bold", marginRight: 10}}>{this.props?.diplome?.type_demande === 'DEUG' ? 
                                         'الدراسات الجامعية العامة' : 'الإجازة في الدراسات الأساسية'}</span>
                                  <span style={{marginRight: 10}}>  في  </span>
                                  <span style={{fontWeight: "bold", marginLeft: 10, marginRight: 10}}> {this.props?.diplome?.filiere === 'Droit en français' ? 'القانون بالفرنسية'  
                                    : this.props?.diplome?.filiere === 'Sciences Economiques et Gestion' ? 'العلوم الاقتصادية والتسيير' : 
                                    this.props?.diplome?.filiere} </span>
                                  بتاريخ
                                    <div>
                                        <Tooltip title="Date de délibération تاريخ المداولة">
                                            <input type="text" defaultValue='.../.../.....' style={{fontWeight: "bold", width: 115, 
                                                   fontSize: 20, borderColor: "Transparent", marginRight: -13}}/>
                                        </Tooltip>
                                    </div>
                            </Typography>
                            <br></br>
                            <Typography style={{ fontSize: 20, marginBottom: 10 }} align='right'>  
                                  قبل سحب الدبلوم من طرف المعني بالأمر لوحظ به خطأ مادي
                                 <span style={{fontWeight: "bold", marginLeft: 10, marginRight: 10}}> 
                                    {this.props?.diplome?.type_erreur} </span>
                                  <span>مما استوجب إعادة طبع الدبلوم </span>
                                  
                            </Typography>
                            <br></br>
                            <Typography style={{ fontSize: 20, marginBottom: 10 }} align='right'>  
                                .لذا نلتمس من سيادتكم التأشير على الدبلوم قصد تسليمه للمعني بالأمر
                            </Typography>
                            <br></br><br></br>
                            <br></br><br></br>
                        </div>
                        <br></br>
            </div> 
            <div style={{margin: 35, paddingTop: 10, borderTop: '8px solid #2596be'}}>
                <Typography component="h3" variant="body" >  
                PROCEDURE D'EDITION ET SIGNATURE DES DIPLOMES
                </Typography>
            </div>
        </div>
        );
    }
}