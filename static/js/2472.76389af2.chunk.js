"use strict";(self.webpackChunkbts=self.webpackChunkbts||[]).push([[2472],{52472:(e,t,n)=>{n.r(t),n.d(t,{default:()=>g});var s=n(9950),r=n(14857),a=n(22433),i=n(95537),c=n(16673),l=n(44414);function u(){(0,c.useHistory)();return(0,l.jsx)(i.A,{sx:{padding:"12px",display:"flex",flexDirection:"column"},children:"Profile"})}var d=n(5544),o=(n(80623),n(41608)),p=n(4721),x=n(29031),h=n(82310);function f(){var e=(0,s.useState)(null),t=(0,d.A)(e,2),n=(t[0],t[1],(0,s.useState)(!1)),r=(0,d.A)(n,2),a=(r[0],r[1],(0,x.dh)().enqueueSnackbar),i=(0,s.useState)([]),c=(0,d.A)(i,2),u=c[0],f=c[1];return(0,s.useEffect)((function(){o.A.get("".concat(p.J,"/api/lms/course/get_calendar/?start_date=2023-09-10")).then((function(e){200===e.status&&(f(e.data),console.log("calendar",e.data))})).catch((function(e){417===e.response.status?a(e.response.data.error,{variant:"error"}):a("\u0645\u0634\u06a9\u0644\u06cc \u067e\u06cc\u0634 \u0622\u0645\u062f\u0647! \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u0633\u0639\u06cc \u06a9\u0646\u06cc\u062f",{variant:"error"})}))}),[]),(0,l.jsx)("div",{style:{display:"flex",flexDirection:"row",width:"100%",marginTop:"50px",marginRight:"165px"},children:u.length>0&&(0,l.jsx)("table",{style:{height:"350px"},children:u.map((function(e,t){return(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{style:{padding:"0px 10px"},children:(0,h.A)(e.date)}),e.sessions.length>0&&e.sessions.map((function(e,t){return(0,l.jsx)("td",{style:{padding:"0px 10px"},children:e.session_num})}))]})}))})})}const g=function(e){var t=(0,r.A)(),n=((0,c.useParams)().id,(0,a.A)(t.breakpoints.down("md")));return(0,l.jsx)(l.Fragment,{children:n?(0,l.jsx)(u,{}):(0,l.jsx)(f,{})})}}}]);