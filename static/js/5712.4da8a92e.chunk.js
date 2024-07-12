"use strict";(self.webpackChunkbts=self.webpackChunkbts||[]).push([[5712],{78468:(e,r,i)=>{i.d(r,{A:()=>l});var n=i(80045),a=(i(9950),i(4139)),s=i(44414),t=["children"];function l(e){var r=e.children;(0,n.A)(e,t);return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(a.Ay,{container:!0,sx:{height:"100vh"},children:[(0,s.jsx)(a.Ay,{item:!0,md:5,sx:{backgroundColor:"#CCEEF0",display:"flex",justifyContent:"center",alignItems:"center"}}),(0,s.jsx)(a.Ay,{item:!0,md:7,sx:{backgroundColor:"#E5E5E5",display:"flex",justifyContent:"center",alignItems:"center"},children:r})]})})}},25712:(e,r,i)=>{i.r(r),i.d(r,{default:()=>C});var n=i(89379),a=(i(9950),i(14857)),s=i(22433),t=i(95537),l=i(14341),d=i(46565),o=i(4534),u=i(37072),p=i(6445),x=i(41608),c=i(16673),h=i(4721),m=i(58926),f=i(29031),j=i(44414);const b=function(e){var r=(0,c.useHistory)(),i=(0,f.dh)().enqueueSnackbar;return(0,j.jsx)(j.Fragment,{children:(0,j.jsx)(p.l1,{initialValues:{name:"",family:"",introducer:"",supplier:""},validationSchema:m.Ik().shape({name:m.Yj().required("\u0646\u0627\u0645 \u0627\u062c\u0628\u0627\u0631\u06cc \u0645\u06cc \u0628\u0627\u0634\u062f"),family:m.Yj().required("\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc \u0627\u062c\u0628\u0627\u0631\u06cc \u0645\u06cc \u0628\u0627\u0634\u062f"),supplier:m.Yj().required("\u0634\u0646\u0627\u0633\u0647 \u06a9\u0627\u0631\u0628\u0631\u06cc \u062a\u0627\u0645\u06cc\u0646 \u06a9\u0646\u0646\u0646\u062f\u0647 \u0627\u062c\u0628\u0627\u0631\u06cc \u0645\u06cc \u0628\u0627\u0634\u062f")}),onSubmit:function(e,n){n.setErrors;var a=n.setSubmitting,s=n.setFieldError;a(!0),x.A.post("".concat(h.J,"/api/users/update_user/"),{first_name:e.name,last_name:e.family,introducer:e.introducer,supplier:e.supplier}).then((function(e){200===e.status&&(r.push("/location"),a(!1))})).catch((function(e){417===e.response.status?i(e.response.data.error,{variant:"error"}):i("\u0645\u0634\u06a9\u0644\u06cc \u067e\u06cc\u0634 \u0622\u0645\u062f\u0647! \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u0633\u0639\u06cc \u06a9\u0646\u06cc\u062f",{variant:"error"}),e.response.data.map((function(e){s(e.field,e.error)})),a(!1)}))},children:function(e){var r=e.errors,i=(e.handleBlur,e.handleChange),n=e.handleSubmit,a=e.isSubmitting,s=e.touched,p=e.values;return(0,j.jsxs)("form",{noValidate:!0,onSubmit:n,style:{display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"0px",gap:"70px",position:"absolute",width:"90%",height:"90%",left:"20px",top:"57px"},children:[(0,j.jsxs)(t.A,{children:[(0,j.jsx)(o.A,{children:"\u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0647\u0648\u06cc\u062a\u06cc"}),(0,j.jsx)(u.A,{children:"\u0645\u0634\u062e\u0635\u0627\u062a \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f:"}),(0,j.jsxs)(t.A,{sx:{mt:0},children:[(0,j.jsx)(u.A,{children:"\u0646\u0627\u0645"}),(0,j.jsx)(l.A,{id:"name","aria-describedby":"my-helper-text",fullWidth:!0,sx:{background:"#F2F2F2",borderRadius:"4px",margin:"6px 3px"},value:p.name,onChange:i,error:Boolean(s.name&&r.name),helperText:s.name&&r.name})]}),(0,j.jsxs)(t.A,{sx:{mt:0},children:[(0,j.jsx)(u.A,{children:"\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc"}),(0,j.jsx)(l.A,{id:"family","aria-describedby":"my-helper-text",fullWidth:!0,sx:{background:"#F2F2F2",borderRadius:"4px",margin:"6px 3px"},value:p.family,onChange:i,error:Boolean(s.family&&r.family),helperText:s.family&&r.family})]}),(0,j.jsxs)(t.A,{sx:{mt:0},children:[(0,j.jsx)(u.A,{children:"\u062a\u0627\u0645\u06cc\u0646 \u06a9\u0646\u0646\u062f\u0647"}),(0,j.jsx)(l.A,{id:"supplier","aria-describedby":"my-helper-text",fullWidth:!0,placeholder:"\u0634\u0646\u0627\u0633\u0647 \u06a9\u0627\u0631\u0628\u0631\u06cc \u062a\u0627\u0645\u06cc\u0646 \u06a9\u0646\u0646\u062f\u0647",sx:{background:"#F2F2F2",borderRadius:"4px",margin:"6px 3px"},value:p.supplier,onChange:i,error:Boolean(s.supplier&&r.supplier),helperText:s.supplier&&r.supplier})]}),(0,j.jsxs)(t.A,{sx:{mt:0},children:[(0,j.jsx)(u.A,{children:"\u0645\u0639\u0631\u0641"}),(0,j.jsx)(l.A,{id:"introducer","aria-describedby":"my-helper-text",fullWidth:!0,placeholder:"\u0634\u0646\u0627\u0633\u0647 \u06a9\u0627\u0631\u0628\u0631\u06cc \u0645\u0639\u0631\u0641",sx:{background:"#F2F2F2",borderRadius:"4px",margin:"6px 3px"},value:p.introducer,onChange:i})]})]}),(0,j.jsx)(t.A,{sx:{display:"inline-flex",justifyContent:"center",gap:2},children:(0,j.jsx)(d.A,{disabled:!1,type:"submit",onClick:function(){return n()},loading:a,children:"\u062b\u0628\u062a"})})]})}})})};var g=i(78468),y=i(13045),A=i(38986),F=i(60172);i(96011);const v=function(e){var r=(0,c.useHistory)(),i=(0,f.dh)().enqueueSnackbar;return(0,j.jsx)(g.A,{children:(0,j.jsx)(t.A,{sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 30px 20px",gap:"60px",position:"absolute",width:"386px",height:"550px",background:"#FFFFFF",border:"1px solid #D3D2D2",borderRadius:"10px"},children:(0,j.jsx)(p.l1,{initialValues:{name:"",family:"",introducer:"",supplier:""},validationSchema:m.Ik().shape({name:m.Yj().required("\u0646\u0627\u0645 \u0627\u062c\u0628\u0627\u0631\u06cc \u0645\u06cc \u0628\u0627\u0634\u062f"),family:m.Yj().required("\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc \u0627\u062c\u0628\u0627\u0631\u06cc \u0645\u06cc \u0628\u0627\u0634\u062f"),supplier:m.Yj().required("\u0634\u0646\u0627\u0633\u0647 \u06a9\u0627\u0631\u0628\u0631\u06cc \u062a\u0627\u0645\u06cc\u0646 \u06a9\u0646\u0646\u0646\u062f\u0647 \u0627\u062c\u0628\u0627\u0631\u06cc \u0645\u06cc \u0628\u0627\u0634\u062f")}),onSubmit:function(e,n){n.setErrors;var a=n.setSubmitting,s=n.setFieldError;a(!0),x.A.post("".concat(h.J,"/api/users/update_user/"),{first_name:e.name,last_name:e.family,introducer:e.introducer,supplier:e.supplier}).then((function(e){200===e.status&&(r.push("/location"),a(!1))})).catch((function(e){417===e.response.status?i(e.response.data.error,{variant:"error"}):i("\u0645\u0634\u06a9\u0644\u06cc \u067e\u06cc\u0634 \u0622\u0645\u062f\u0647! \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u0633\u0639\u06cc \u06a9\u0646\u06cc\u062f",{variant:"error"}),e.response.data.map((function(e){s(e.field,e.error)})),a(!1)})),a(!1)},children:function(e){var r=e.errors,i=(e.handleBlur,e.handleChange),n=e.handleSubmit,a=e.isSubmitting,s=e.touched,d=e.values;return(0,j.jsxs)("form",{noValidate:!0,onSubmit:n,style:{display:"flex",flexDirection:"column",alignItems:"start",justifyContent:"space-between",width:"100%",height:"100%"},children:[(0,j.jsxs)(t.A,{sx:{width:"100%"},children:[(0,j.jsx)(A.A,{children:"\u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0647\u0648\u06cc\u062a\u06cc"}),(0,j.jsx)(t.A,{sx:{mt:0},children:(0,j.jsx)(F.A,{children:"\u0645\u0634\u062e\u0635\u0627\u062a \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f:"})}),(0,j.jsxs)(t.A,{sx:{mt:0},children:[(0,j.jsx)(F.A,{style:{marginRight:"5px"},children:"\u0646\u0627\u0645"}),(0,j.jsx)(l.A,{id:"name","aria-describedby":"my-helper-text",fullWidth:!0,sx:{background:"#F2F2F2",borderRadius:"4px",margin:"6px 3px"},value:d.name,onChange:i,error:Boolean(s.name&&r.name),helperText:s.name&&r.name})]}),(0,j.jsxs)(t.A,{sx:{mt:0},children:[(0,j.jsx)(F.A,{style:{marginRight:"5px"},children:"\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc"}),(0,j.jsx)(l.A,{id:"family","aria-describedby":"my-helper-text",fullWidth:!0,sx:{background:"#F2F2F2",borderRadius:"4px",margin:"6px 3px"},value:d.family,onChange:i,error:Boolean(s.family&&r.family),helperText:s.family&&r.family})]}),(0,j.jsxs)(t.A,{sx:{mt:0},children:[(0,j.jsx)(F.A,{children:"\u062a\u0627\u0645\u06cc\u0646 \u06a9\u0646\u0646\u062f\u0647"}),(0,j.jsx)(l.A,{id:"supplier","aria-describedby":"my-helper-text",fullWidth:!0,placeholder:"\u0634\u0646\u0627\u0633\u0647 \u06a9\u0627\u0631\u0628\u0631\u06cc \u062a\u0627\u0645\u06cc\u0646 \u06a9\u0646\u0646\u062f\u0647",sx:{background:"#F2F2F2",borderRadius:"4px",margin:"6px 3px"},value:d.supplier,onChange:i,error:Boolean(s.supplier&&r.supplier),helperText:s.supplier&&r.supplier})]}),(0,j.jsxs)(t.A,{sx:{mt:0},children:[(0,j.jsx)(F.A,{children:"\u0645\u0639\u0631\u0641"}),(0,j.jsx)(l.A,{id:"introducer","aria-describedby":"my-helper-text",fullWidth:!0,placeholder:"\u0634\u0646\u0627\u0633\u0647 \u06a9\u0627\u0631\u0628\u0631\u06cc \u0645\u0639\u0631\u0641",sx:{background:"#F2F2F2",borderRadius:"4px",margin:"6px 3px"},value:d.introducer,onChange:i})]})]}),(0,j.jsx)(t.A,{sx:{padding:"0px",margin:0,width:"100%",display:"inline-flex",justifyContent:"center",gap:2},children:(0,j.jsx)(y.A,{disabled:a,loading:a,children:"\u062b\u0628\u062a"})})]})}})})})};const C=function(e){var r=(0,a.A)(),i=(0,s.A)(r.breakpoints.down("md"));return(0,j.jsx)(j.Fragment,{children:i?(0,j.jsx)(b,(0,n.A)({},e)):(0,j.jsx)(v,(0,n.A)({},e))})}}}]);