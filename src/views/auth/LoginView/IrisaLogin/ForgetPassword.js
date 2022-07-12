// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import withStyles from '@mui/material/styles/withStyles';
// import { withRouter } from 'react-router-dom';
// import {
//   Button,
//   Grid,
//   Step,
//   StepLabel,
//   Stepper,
//   Typography
// } from '@mui/material';
// // import { styles } from '../../Utils/MaterialTheme/jss/style';
// // import IbxDialog from '@irisa/components-Boot-v.3/lib/Dialog';
// // import IbxTextField from '@irisa/components-Boot-v.3/lib/TextField';
// // import IbxForm from '@irisa/components-Boot-v.3/lib/Form';

// class ForgetPassword extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeStep: 0,
//       skipped: new Set(),
//       personalId: null,
//       verificationCode: null,
//       newPassword: null,
//       repeatNewPassword: null
//     };
//   }

//   handleInputChange = event => {
//     const target = event.target;
//     const inputName = target.name;
//     const inputValue = target.value;

//     this.setState({
//       [inputName]: inputValue
//     });
//   };

//   getSteps = () => {
//     return ['دریافت کد تایید', 'بررسی کد تایید', 'تغییر رمز جدید'];
//   };

//   stepActivator = () => {};

//   //   getStepContent = step => {
//   //     switch (step) {
//   //       case 0:
//   //         return (
//   //           <div>
//   //             <span>
//   //               کاربر گرامی، خواهشمند است جهت دریافت مجدد رمز عبور خود، مراحل
//   //               بازنشانی رمز را در بخش زیر طی کنید.
//   //             </span>
//   //             <IbxForm>
//   //               <Grid container>
//   //                 <Grid sm md={4} item>
//   //                   <IbxTextField
//   //                     label="شماره پرسنلی"
//   //                     onChange={this.handleInputChange}
//   //                     name="personalId"
//   //                     value={this.state.personalId}
//   //                   />
//   //                 </Grid>
//   //               </Grid>
//   //             </IbxForm>
//   //           </div>
//   //         );
//   //       case 1:
//   //         return (
//   //           <div style={{ textAlign: 'center' }}>
//   //             <strong>
//   //               یک کد تایید برای موبایل شما ارسال می شود، لطفا این کد را وارد
//   //               نمایید.
//   //             </strong>
//   //             <br />
//   //             <span>
//   //               (درصورتی که کد برای شما ارسال نشد، درخواست ارسال مجدددهید.)
//   //             </span>
//   //             <IbxForm>
//   //               <Grid container>
//   //                 <Grid sm md={6} item>
//   //                   <IbxTextField
//   //                     label="شماره پرسنلی"
//   //                     name="personalId"
//   //                     disabled
//   //                     value={this.state.personalId}
//   //                   />
//   //                 </Grid>
//   //                 <Grid sm md={6} item>
//   //                   <IbxTextField
//   //                     label="کد تایید"
//   //                     name="verificationCode"
//   //                     onChange={this.handleInputChange}
//   //                     value={this.state.verificationCode}
//   //                   />
//   //                 </Grid>
//   //               </Grid>
//   //             </IbxForm>
//   //           </div>
//   //         );
//   //       case 2:
//   //         return (
//   //           <div style={{ textAlign: 'center' }}>
//   //             <strong>
//   //               کاربر گرامی رمز عبور جدیدی برای حساب کاربری خود تعیین نمائید.
//   //             </strong>
//   //             <br />
//   //             <span>نام کاربری:{this.state.personalId}</span>
//   //             <IbxForm>
//   //               <Grid container>
//   //                 <Grid sm md={6} item>
//   //                   <IbxTextField
//   //                     label="گذرواژه جدید"
//   //                     name="newPassword"
//   //                     value={this.state.newPassword}
//   //                     onChange={this.handleInputChange}
//   //                   />
//   //                 </Grid>
//   //                 <Grid sm md={6} item>
//   //                   <IbxTextField
//   //                     label="تکرار گذرواژه"
//   //                     name="repeatNewPassword"
//   //                     onChange={this.handleInputChange}
//   //                     value={this.state.repeatNewPassword}
//   //                   />
//   //                 </Grid>
//   //               </Grid>
//   //             </IbxForm>
//   //           </div>
//   //         );
//   //     }
//   //   };

//   isStepOptional = step => step === 1;

//   handleNext = async () => {
//     const { activeStep } = this.state;
//     switch (activeStep) {
//       case 0:
//         //send personal id
//         break;
//       case 1:
//         //send verification code
//         break;
//       case 2:
//         //change password
//         break;
//     }
//     this.setState({
//       activeStep: activeStep + 1
//     });
//   };

//   handleBack = () => {
//     this.setState(state => ({
//       activeStep: state.activeStep - 1
//     }));
//   };

//   handleSkip = () => {
//     const { activeStep } = this.state;
//     if (!this.isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.");
//     }

//     this.setState(state => {
//       const skipped = new Set(state.skipped.values());
//       skipped.add(activeStep);
//       return {
//         activeStep: state.activeStep + 1,
//         skipped
//       };
//     });
//   };

//   handleReset = () => {
//     this.setState({
//       activeStep: 0
//     });
//   };

//   isStepSkipped(step) {
//     return this.state.skipped.has(step);
//   }

//   render() {
//     const { classes, theme, openModal, eventClose, fullScreen } = this.props;
//     const { activeStep } = this.state;
//     const steps = this.getSteps();

//     return (
//         <div>
//     //   <IbxDialog
//     //     fullScreen={fullScreen}
//     //     TransitionComponent
//     //     title="فراموشی کلمه عبور"
//     //     openModal={openModal}
//     //     eventClose={eventClose}
//     //   >
//     //     <Stepper activeStep={activeStep}>
//     //       {steps.map((label, index) => {
//     //         const props = {};
//     //         const labelProps = {};
//     //         if (this.isStepSkipped(index)) {
//     //           props.completed = false;
//     //         }
//     //         return (
//     //           <Step key={label} {...props}>
//     //             <StepLabel {...labelProps}>{label}</StepLabel>
//     //           </Step>
//     //         );
//     //       })}
//     //     </Stepper>
//     //     <div>
//     //       {activeStep === steps.length ? (
//     //         <div style={{ textAlign: 'left' }}>
//     //           <Typography
//     //             style={{ textAlign: 'right' }}
//     //             className={classes.instructions}
//     //           >
//     //             کلیه مراحل با موفقیت انجام شد.
//     //           </Typography>
//     //           <Button
//     //             variant="contained"
//     //             size="large"
//     //             onClick={this.handleReset}
//     //             className={classes.button}
//     //           >
//     //             مجدد
//     //           </Button>
//     //         </div>
//     //       ) : (
//     //         <div style={{ textAlign: 'left' }}>
//     //           <Typography className={classes.instructions}>
//     //             {this.getStepContent(activeStep)}
//     //           </Typography>
//     //           <div>
//     //             <Button
//     //               variant="contained"
//     //               color="default"
//     //               size="large"
//     //               disabled={activeStep === 0}
//     //               onClick={this.handleBack}
//     //               className={classes.button}
//     //             >
//     //               قبلی
//     //             </Button>
//     //             {this.isStepOptional(activeStep) && (
//     //               <Button
//     //                 variant="contained"
//     //                 size="large"
//     //                 color="primary"
//     //                 onClick={this.handleSkip}
//     //                 className={classes.button}
//     //               >
//     //                 رد کردن
//     //               </Button>
//     //             )}
//     //             <Button
//     //               variant="contained"
//     //               color="primary"
//     //               size="large"
//     //               onClick={this.handleNext}
//     //               className={classes.button}
//     //               disabled={
//     //                 this.state.personalId === null ||
//     //                 this.state.personalId === ''
//     //               }
//     //             >
//     //               {activeStep === 0 ? 'ارسال پیام' : ''}
//     //               {activeStep === 1 ? 'بررسی تائیدیه' : ''}
//     //               {activeStep === 2 ? 'تغییر گذرواژه' : ''}
//     //             </Button>
//     //           </div>
//     //         </div>
//     //       )}
//     //     </div>
//     //   </IbxDialog>
//     </div>
//     );
//   }
// }

// ForgetPassword.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired
// };

// export default withRouter(
//   withStyles(styles, { withTheme: true })(ForgetPassword)
// );
