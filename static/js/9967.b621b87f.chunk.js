"use strict";(self.webpackChunkbts=self.webpackChunkbts||[]).push([[9967],{29967:(e,t,n)=>{n.r(t),n.d(t,{default:()=>S});var r=n(89379),a=n(9950),s=n(14857),i=n(22433),l=n(5544),o=n(95537),u=n(14341),d=n(46565),c=n(37072),m=n(6445),h=n(41608),p=n(16673),x=n(4721),f=n(58926),j=n(29031),_=n(44414);const A=function(e){var t=(0,a.useState)(null),n=(0,l.A)(t,2),r=(n[0],n[1],(0,a.useState)(null)),s=(0,l.A)(r,2),i=(s[0],s[1],(0,a.useState)(null)),A=(0,l.A)(i,2),b=(A[0],A[1],(0,a.useState)(null)),v=(0,l.A)(b,2),g=(v[0],v[1],(0,j.dh)().enqueueSnackbar),S=(0,p.useHistory)();return(0,_.jsx)(o.A,{sx:{mt:"20px"},children:(0,_.jsx)(m.l1,{initialValues:{Desktop:"",first_name:"",last_name:""},validationSchema:f.Ik().shape({first_name:f.Yj().required("\u0646\u0627\u0645 \u0627\u062c\u0628\u0627\u0631\u06cc \u0645\u06cc \u0628\u0627\u0634\u062f"),last_name:f.Yj().required("\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc \u0627\u062c\u0628\u0627\u0631\u06cc \u0645\u06cc \u0628\u0627\u0634\u062f"),mobile:f.Yj().required("\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06cc\u0644 \u0627\u062c\u0628\u0627\u0631\u06cc \u0645\u06cc \u0628\u0627\u0634\u062f")}),onSubmit:function(e,t){t.setErrors;var n,r=t.setSubmitting;r(!0),h.A.post("".concat(x.J,"/api/project/warranty/update_certificate/\n            "),{ref_num:null===(n=data)||void 0===n?void 0:n.ref_num,mobile:e.mobile,first_name:e.first_name,last_name:e.last_name}).then((function(e){var t;200===e.status&&(h.A.post("".concat(x.J,"/api/project/warranty/submit_certificate/"),{ref_num:null===(t=data)||void 0===t?void 0:t.ref_num}).then((function(e){200===e.status&&S.push("/project/request")})).catch((function(e){417===e.response.status?g(e.response.data.error,{variant:"error"}):g("\u0645\u0634\u06a9\u0644\u06cc \u067e\u06cc\u0634 \u0622\u0645\u062f\u0647! \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u0633\u0639\u06cc \u06a9\u0646\u06cc\u062f",{variant:"error"})})),r(!1))})).catch((function(e){417===e.response.status?g(e.response.data.error,{variant:"error"}):g("\u0645\u0634\u06a9\u0644\u06cc \u067e\u06cc\u0634 \u0622\u0645\u062f\u0647! \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u0633\u0639\u06cc \u06a9\u0646\u06cc\u062f",{variant:"error"})})),r(!1)},children:function(e){var t=e.errors,n=(e.handleBlur,e.handleChange),r=e.handleSubmit,a=(e.setFieldValue,e.isSubmitting,e.touched),s=e.values;return(0,_.jsxs)("form",{noValidate:!0,onSubmit:r,style:{display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"0px",height:"540px",gap:"20px",overflow:"auto"},children:[(0,_.jsxs)(o.A,{children:[(0,_.jsx)(o.A,{sx:{mt:2},children:(0,_.jsx)(c.A,{children:"\u0627\u0637\u0644\u0627\u0639\u0627\u062a \u06a9\u0627\u0631\u0641\u0631\u0645\u0627 \u0631\u0627 \u0645\u0634\u062e\u0635 \u06a9\u0646\u06cc\u062f"})}),(0,_.jsxs)(o.A,{sx:{mt:2},children:[(0,_.jsx)(c.A,{children:"\u0646\u0627\u0645"}),(0,_.jsx)(u.A,{placeholder:"\u0646\u0627\u0645",fullWidth:!0,id:"first_name",value:s.first_name,onChange:n,error:Boolean(a.first_name&&t.first_name),helperText:a.first_name&&t.first_name})]}),(0,_.jsxs)(o.A,{sx:{mt:2},children:[(0,_.jsx)(c.A,{children:"\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc"}),(0,_.jsx)(u.A,{placeholder:"\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc",fullWidth:!0,id:"last_name",value:s.last_name,onChange:n,error:Boolean(a.last_name&&t.last_name),helperText:a.last_name&&t.last_name})]}),(0,_.jsxs)(o.A,{sx:{mt:2},children:[(0,_.jsx)(c.A,{children:"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06cc\u0644"}),(0,_.jsx)(u.A,{placeholder:"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06cc\u0644",fullWidth:!0,id:"mobile",value:s.mobile,onChange:n,error:Boolean(a.mobile&&t.mobile),helperText:a.mobile&&t.mobile})]})]}),(0,_.jsxs)(o.A,{sx:{display:"inline-flex",justifyContent:"center",gap:2},children:[(0,_.jsx)(d.A,{disabled:!1,variant:"outlined",onClick:function(){setOpenDesigner(!1)},type:"button",children:"\u0644\u063a\u0648"}),(0,_.jsx)(d.A,{type:"submit",children:"\u062b\u0628\u062a"})]})]})}})})};var b=n(13045),v=n(60172);const g=function(e){var t=e.location.state.data,n=(0,a.useState)(null),r=(0,l.A)(n,2),s=(r[0],r[1],(0,a.useState)(null)),i=(0,l.A)(s,2),d=(i[0],i[1],(0,a.useState)(null)),c=(0,l.A)(d,2),A=(c[0],c[1],(0,a.useState)(null)),g=(0,l.A)(A,2),S=(g[0],g[1],(0,j.dh)().enqueueSnackbar),y=(0,p.useHistory)();return(0,_.jsx)(o.A,{sx:{mt:"80px",ml:"120px",width:"400px",background:"white",padding:"20px",height:"650px",borderRadius:"8px"},children:(0,_.jsx)(m.l1,{initialValues:{Desktop:"",first_name:"",last_name:""},validationSchema:f.Ik().shape({first_name:f.Yj().required("\u0646\u0627\u0645 \u0627\u062c\u0628\u0627\u0631\u06cc \u0645\u06cc \u0628\u0627\u0634\u062f"),last_name:f.Yj().required("\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc \u0627\u062c\u0628\u0627\u0631\u06cc \u0645\u06cc \u0628\u0627\u0634\u062f"),mobile:f.Yj().required("\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06cc\u0644 \u0627\u062c\u0628\u0627\u0631\u06cc \u0645\u06cc \u0628\u0627\u0634\u062f")}),onSubmit:function(e,n){n.setErrors;var r=n.setSubmitting;r(!0),h.A.post("".concat(x.J,"/api/project/warranty/update_certificate/\n            "),{ref_num:null===t||void 0===t?void 0:t.ref_num,mobile:e.mobile,first_name:e.first_name,last_name:e.last_name}).then((function(e){200===e.status&&(h.A.post("".concat(x.J,"/api/project/warranty/submit_certificate/"),{ref_num:null===t||void 0===t?void 0:t.ref_num}).then((function(e){200===e.status&&y.push("/project/request")})).catch((function(e){417===e.response.status?S(e.response.data.error,{variant:"error"}):S("\u0645\u0634\u06a9\u0644\u06cc \u067e\u06cc\u0634 \u0622\u0645\u062f\u0647! \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u0633\u0639\u06cc \u06a9\u0646\u06cc\u062f",{variant:"error"})})),r(!1))})).catch((function(e){417===e.response.status?S(e.response.data.error,{variant:"error"}):S("\u0645\u0634\u06a9\u0644\u06cc \u067e\u06cc\u0634 \u0622\u0645\u062f\u0647! \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u0633\u0639\u06cc \u06a9\u0646\u06cc\u062f",{variant:"error"})})),r(!1)},children:function(e){var t=e.errors,n=(e.handleBlur,e.handleChange),r=e.handleSubmit,a=(e.setFieldValue,e.isSubmitting,e.touched),s=e.values;return(0,_.jsxs)("form",{noValidate:!0,onSubmit:r,style:{display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"0px",height:"540px",gap:"20px",overflow:"auto"},children:[(0,_.jsxs)(o.A,{children:[(0,_.jsx)(o.A,{sx:{mt:2},children:(0,_.jsx)(v.A,{children:"\u0627\u0637\u0644\u0627\u0639\u0627\u062a \u06a9\u0627\u0631\u0641\u0631\u0645\u0627 \u0631\u0627 \u0645\u0634\u062e\u0635 \u06a9\u0646\u06cc\u062f"})}),(0,_.jsxs)(o.A,{sx:{mt:2},children:[(0,_.jsx)(v.A,{children:"\u0646\u0627\u0645"}),(0,_.jsx)(u.A,{placeholder:"\u0646\u0627\u0645",fullWidth:!0,id:"first_name",value:s.first_name,onChange:n,error:Boolean(a.first_name&&t.first_name),helperText:a.first_name&&t.first_name})]}),(0,_.jsxs)(o.A,{sx:{mt:2},children:[(0,_.jsx)(v.A,{children:"\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc"}),(0,_.jsx)(u.A,{placeholder:"\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc",fullWidth:!0,id:"last_name",value:s.last_name,onChange:n,error:Boolean(a.last_name&&t.last_name),helperText:a.last_name&&t.last_name})]}),(0,_.jsxs)(o.A,{sx:{mt:2},children:[(0,_.jsx)(v.A,{children:"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06cc\u0644"}),(0,_.jsx)(u.A,{placeholder:"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06cc\u0644",fullWidth:!0,id:"mobile",value:s.mobile,onChange:n,error:Boolean(a.mobile&&t.mobile),helperText:a.mobile&&t.mobile})]})]}),(0,_.jsxs)(o.A,{sx:{display:"inline-flex",justifyContent:"center",gap:2},children:[(0,_.jsx)(b.A,{disabled:!1,variant:"outlined",onClick:function(){setOpenDesigner(!1)},type:"button",children:"\u0644\u063a\u0648"}),(0,_.jsx)(b.A,{type:"submit",children:"\u062b\u0628\u062a"})]})]})}})})};const S=function(e){var t=(0,s.A)(),n=(0,i.A)(t.breakpoints.down("md"));return(0,_.jsx)(_.Fragment,{children:n?(0,_.jsx)(A,(0,r.A)({},e)):(0,_.jsx)(g,(0,r.A)({},e))})}}}]);