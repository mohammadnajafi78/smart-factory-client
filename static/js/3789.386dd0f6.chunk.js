"use strict";(self.webpackChunkbts=self.webpackChunkbts||[]).push([[3789],{25358:(e,r,n)=>{n.d(r,{A:()=>l});n(9950);var t=n(95537),a=n(36233),i=n(93999),s=n(12833),o=n(44414);function l(e){var r=e.activeStep,n=e.steps;return(0,o.jsx)(t.A,{sx:{width:"100%"},children:(0,o.jsx)(a.A,{activeStep:r,alternativeLabel:!0,sx:{".MuiStepIcon-root":{color:"#F2F2F2"}},children:n.map((function(e){return(0,o.jsx)(i.A,{children:(0,o.jsx)(s.A,{children:e})},e)}))})})}},95266:(e,r,n)=>{n.d(r,{A:()=>d});var t=n(64467),a=(n(9950),n(59254)),i=n(95537),s=n(61763),o=n(86551),l=n(44414),c=(0,a.Ay)(s.A)((function(e){var r;e.theme;return r={height:10,borderRadius:0,marginTop:"5px"},(0,t.A)(r,"&.".concat(o.A.colorPrimary),{backgroundColor:"#D3D2D2"}),(0,t.A)(r,"& .".concat(o.A.bar),{borderRadius:5,backgroundColor:"#00AAB5"}),r}));function d(e){return(0,l.jsx)(i.A,{sx:{flexGrow:1},children:(0,l.jsx)(c,{variant:"determinate",value:e.percentage})})}},53789:(e,r,n)=>{n.r(r),n.d(r,{default:()=>k});var t=n(89379),a=(n(9950),n(14857)),i=n(22433),s=n(95537),o=n(14341),l=n(46565),c=n(4534),d=n(37072),u=n(6445),h=n(41608),p=n(16673),x=n(4721),A=n(58926),j=n(95266),m=n(29031),f=n(44414);const g=function(e){var r=(0,m.dh)().enqueueSnackbar,n=(0,p.useHistory)();return(0,f.jsxs)(s.A,{sx:{mt:"20px"},children:[(0,f.jsx)(c.A,{style:{marginRight:"10px"},children:"\u062a\u0633\u062a \u0633\u06cc\u0633\u062a\u0645"}),(0,f.jsx)(j.A,{percentage:100}),(0,f.jsx)(u.l1,{initialValues:{},validationSchema:A.Ik().shape({}),onSubmit:function(e,t){t.setErrors;var a=t.setSubmitting;a(!0),h.A.post("".concat(x.J,"/api/project/design/update_design/"),{ref_num:"",design_type:[1,2,3],control:"MANUAL"}).then((function(e){200===e.status&&(n.push({pathname:"/project/project/new/2"}),a(!1))})).catch((function(e){417===e.response.status?r(e.response.data.error,{variant:"error"}):r("\u0645\u0634\u06a9\u0644\u06cc \u067e\u06cc\u0634 \u0622\u0645\u062f\u0647! \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u0633\u0639\u06cc \u06a9\u0646\u06cc\u062f",{variant:"error"})})),a(!1)},children:function(e){var r=e.errors,n=(e.handleBlur,e.handleChange),t=e.handleSubmit,a=(e.setFieldValue,e.isSubmitting,e.touched),i=e.values;return(0,f.jsxs)("form",{noValidate:!0,onSubmit:t,style:{display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"0px",gap:"159px",position:"absolute",width:"90%",height:"88%",left:"20px",top:"67px"},children:[(0,f.jsxs)(s.A,{children:[(0,f.jsx)(s.A,{sx:{mt:2},children:(0,f.jsx)(d.A,{children:"\u0641\u0631\u0645 \u062a\u0633\u062a \u0633\u06cc\u0633\u062a\u0645 \u0631\u0627 \u067e\u0631 \u06a9\u0646\u06cc\u062f"})}),(0,f.jsx)(s.A,{sx:{mt:2},children:(0,f.jsxs)(s.A,{sx:{mt:2},children:[(0,f.jsx)(d.A,{children:"\u0639\u0646\u0648\u0627\u0646"}),(0,f.jsx)(o.A,{placeholder:"\u0639\u0646\u0648\u0627\u0646",fullWidth:!0,id:"area",value:i.area,onChange:n,error:Boolean(a.area&&r.area),helperText:a.area&&r.area})]})})]}),(0,f.jsx)(s.A,{sx:{display:"inline-flex",justifyContent:"center",gap:2},children:(0,f.jsx)(l.A,{type:"submit",children:"\u062b\u0628\u062a"})})]})}})]})};var b=n(13045),v=n(38986),y=n(60172),S=n(25358);const w=function(e){var r=(0,m.dh)().enqueueSnackbar,n=(0,p.useHistory)();return(0,f.jsxs)(s.A,{sx:{mt:"80px",ml:"120px",width:"400px",background:"white",padding:"20px",height:"650px",borderRadius:"8px"},children:[(0,f.jsx)(v.A,{style:{marginRight:"10px"},children:"\u062a\u0633\u062a \u0633\u06cc\u0633\u062a\u0645"}),(0,f.jsx)(S.A,{activeStep:2,steps:["","",""]}),(0,f.jsx)(u.l1,{initialValues:{},validationSchema:A.Ik().shape({}),onSubmit:function(e,t){t.setErrors;var a=t.setSubmitting;a(!0),h.A.post("".concat(x.J,"/api/project/design/update_design/"),{ref_num:"",design_type:[1,2,3],control:"MANUAL"}).then((function(e){200===e.status&&(n.push({pathname:"/project/project/new/2"}),a(!1))})).catch((function(e){417===e.response.status?r(e.response.data.error,{variant:"error"}):r("\u0645\u0634\u06a9\u0644\u06cc \u067e\u06cc\u0634 \u0622\u0645\u062f\u0647! \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u0633\u0639\u06cc \u06a9\u0646\u06cc\u062f",{variant:"error"})})),a(!1)},children:function(e){var r=e.errors,n=(e.handleBlur,e.handleChange),t=e.handleSubmit,a=(e.setFieldValue,e.isSubmitting,e.touched),i=e.values;return(0,f.jsxs)("form",{noValidate:!0,onSubmit:t,style:{display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"0px",height:"540px",gap:"20px",overflow:"auto"},children:[(0,f.jsxs)(s.A,{children:[(0,f.jsx)(s.A,{sx:{mt:2},children:(0,f.jsx)(y.A,{children:"\u0641\u0631\u0645 \u062a\u0633\u062a \u0633\u06cc\u0633\u062a\u0645 \u0631\u0627 \u067e\u0631 \u06a9\u0646\u06cc\u062f"})}),(0,f.jsx)(s.A,{sx:{mt:2},children:(0,f.jsxs)(s.A,{sx:{mt:2},children:[(0,f.jsx)(y.A,{children:"\u0639\u0646\u0648\u0627\u0646"}),(0,f.jsx)(o.A,{placeholder:"\u0639\u0646\u0648\u0627\u0646",fullWidth:!0,id:"area",value:i.area,onChange:n,error:Boolean(a.area&&r.area),helperText:a.area&&r.area})]})})]}),(0,f.jsx)(s.A,{sx:{display:"inline-flex",justifyContent:"center",gap:2},children:(0,f.jsx)(b.A,{type:"submit",children:"\u062b\u0628\u062a"})})]})}})]})};const k=function(e){var r=(0,a.A)(),n=(0,i.A)(r.breakpoints.down("md"));return(0,f.jsx)(f.Fragment,{children:n?(0,f.jsx)(g,(0,t.A)({},e)):(0,f.jsx)(w,(0,t.A)({},e))})}}}]);