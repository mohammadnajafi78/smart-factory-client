"use strict";(self.webpackChunkbts=self.webpackChunkbts||[]).push([[3583],{13513:(e,t,n)=>{n.d(t,{A:()=>m});var i=n(5544),s=n(9950),x=n(95537),l=n(60172),r=n(38986),a=n(63098),d=n(80623),c=n(70821),o=n(82878),p=n(13045),h=n(41608),f=n(4721),g=n(48400),u=n(29031),j=n(44414),A=(0,c.A)((function(e){return{paper:{borderRadius:"20px 20px 0px 0px",zIndex:999,position:"fixed",bottom:0,minHeight:"40%"}}}));function m(e){var t=e.selected,n=e.setRefresh,c=(0,s.useState)(!1),m=(0,i.A)(c,2),y=m[0],w=m[1],b=(0,s.useState)(null),F=(0,i.A)(b,2),C=F[0],D=F[1],I=(A(),(0,u.dh)().enqueueSnackbar);return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(x.A,{sx:{display:"flex",flexDirection:"column",alignItems:"center",padding:"0px 20px 0px"},children:(0,j.jsxs)(x.A,{sx:{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center",padding:"16px 0px",width:"100%"},children:[(0,j.jsxs)(x.A,{sx:{display:"flex",flexDirection:"column",alignItems:"flex-start",padding:"0px",gap:"16px",width:"100%"},children:[(0,j.jsx)(r.A,{children:"\u062a\u0648\u0636\u06cc\u062d\u0627\u062a"}),(0,j.jsx)(l.A,{children:t.gift_data.description}),(0,j.jsxs)(x.A,{sx:{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"flex-start",padding:"30px 16px 40px",gap:"20px",background:"#FFFFFF"},children:[(0,j.jsx)(r.A,{style:{color:"#00346D"},children:"\u0646\u062d\u0648\u0647 \u0627\u0646\u062a\u0642\u0627\u0644"}),(0,j.jsxs)(x.A,{sx:{display:"flex",justifyContent:"center",alignItems:"flex-start",flexDirection:"column"},children:[(0,j.jsx)(l.A,{children:"1- \u06af\u06cc\u0631\u0646\u062f\u0647 \u062c\u0627\u06cc\u0632\u0647\u060c \u0628\u0631\u0648\u06cc \u062f\u06a9\u0645\u0647 \u201c\u062f\u0631\u06cc\u0627\u0641\u062a \u062c\u0627\u06cc\u0632\u0647\u201d \u0628\u0632\u0646\u062f."}),(0,j.jsx)(l.A,{children:"2- \u06a9\u062f QR \u0632\u06cc\u0631 \u0631\u0627 \u0627\u0633\u06a9\u0646 \u06a9\u0646\u062f."}),(0,j.jsx)(l.A,{children:"3- \u062c\u0627\u06cc\u0632\u0647 \u0628\u0647 \u062c\u0648\u0627\u06cc\u0632 \u062f\u0631\u06cc\u0627\u0641\u062a\u06cc \u06a9\u0627\u0631\u0628\u0631 \u06af\u06cc\u0631\u0646\u062f\u0647 \u0645\u0646\u062a\u0642\u0644 \u0645\u06cc \u0634\u0648\u062f"})]})]})]}),(0,j.jsxs)(a.A,{style:{width:"400px"},onClick:function(){w(!0),h.A.get("".concat(f.J,"/api/club/user_gifts/get_gift_qrcode/?gift_id=").concat(t.id)).then((function(e){200===e.status&&D(e.data.qr_code)})).catch((function(e){417===e.response.status?I(e.response.data.error,{variant:"error"}):I("\u0645\u0634\u06a9\u0644\u06cc \u067e\u06cc\u0634 \u0622\u0645\u062f\u0647! \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u0633\u0639\u06cc \u06a9\u0646\u06cc\u062f",{variant:"error"})}))},disabled:"valid"!==t.status.toLowerCase(),children:[(0,j.jsx)("img",{src:d.A,width:"26px",height:"20px",style:{color:"white"}}),(0,j.jsx)("div",{children:"\u0627\u0646\u062a\u0642\u0627\u0644 \u062c\u0627\u06cc\u0632\u0647"})]})]})}),(0,j.jsx)(o.A,{open:y,handleClose:function(){w(!1),D(null),n(!0)},title:"\u0627\u0646\u062a\u0642\u0627\u0644 \u062c\u0627\u06cc\u0632\u0647",content:(0,j.jsxs)(x.A,{sx:{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center",padding:"8px 16px 12px",gap:"20px",background:"#FFFFFF"},children:[(0,j.jsx)(r.A,{style:{color:"#00346D"},children:t.name}),(0,j.jsxs)(x.A,{sx:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[(0,j.jsx)(l.A,{children:"1- \u06af\u06cc\u0631\u0646\u062f\u0647 \u062c\u0627\u06cc\u0632\u0647\u060c \u0628\u0631\u0648\u06cc \u062f\u06a9\u0645\u0647 \u201c\u062f\u0631\u06cc\u0627\u0641\u062a \u062c\u0627\u06cc\u0632\u0647\u201d \u0628\u0632\u0646\u062f."}),(0,j.jsx)(l.A,{children:"2- \u06a9\u062f QR \u0632\u06cc\u0631 \u0631\u0627 \u0627\u0633\u06a9\u0646 \u06a9\u0646\u062f."})]}),(0,j.jsx)(x.A,{sx:{display:"flex",gap:2,width:"328px",height:"328px",justifyContent:"center",alignItems:"center"},children:C&&(0,j.jsx)(g.A,{value:C})})]}),actions:(0,j.jsx)(x.A,{sx:{display:"inline-flex",justifyContent:"space-between",gap:2,width:"100%",height:"76px",padding:"12px 16px"},children:(0,j.jsx)(p.A,{variant:"contained",onClick:function(){return w(!1)},children:"\u0628\u0633\u062a\u0646"})})})]})}},33583:(e,t,n)=>{n.r(t),n.d(t,{default:()=>D});var i=n(89379),s=n(9950),x=n(14857),l=n(22433),r=n(5544),a=n(95537),d=n(18001),c=n(30582),o=n(37072),p=n(4534),h=n(22466),f=n(80623),g=n(70821),u=n(41608),j=n(4721),A=n(82310),m=n(48400),y=n(29031),w=n(44414),b=(0,g.A)((function(e){return{paper:{borderRadius:"20px 20px 0px 0px",zIndex:999,position:"fixed",bottom:0,minHeight:"40%"}}}));function F(e){var t=(0,s.useState)(e.location.state),n=(0,r.A)(t,2),i=n[0],x=(n[1],(0,s.useState)(!1)),l=(0,r.A)(x,2),g=l[0],F=l[1],C=(0,s.useState)(null),D=(0,r.A)(C,2),I=D[0],_=D[1],v=b(),k=(0,y.dh)().enqueueSnackbar;return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(a.A,{sx:{display:"flex",flexDirection:"column",alignItems:"center",padding:"12px 12px 0px"},children:[(0,w.jsxs)(a.A,{sx:{display:"flex",flexDirection:"row",alignItems:"center",padding:"16px",gap:"10px",width:"100%",height:"114px",background:"#FFFFFF",boxShadow:"0px 0px 8px rgba(146, 146, 146, 0.25)",borderRadius:"8px"},children:[(0,w.jsx)(a.A,{sx:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"10px",borderRadius:"8px"},children:(0,w.jsx)("img",{src:i.gift_data.image,alt:i.gift_data.name,style:{width:"74px",height:"100px"}})}),(0,w.jsxs)(a.A,{sx:{display:"flex",flexDirection:"column",alignItems:"flex-start",padding:"0px",gap:"22px",width:"100%",height:"70px"},children:[(0,w.jsxs)(a.A,{sx:{display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center",padding:"0px",gap:"8px",borderBottom:"0.5px solid #D7D7D7",paddingBottom:"8px",width:"100%",height:"25px"},children:[(0,w.jsx)(o.A,{style:{fontWeight:500,fontSize:"16px",color:"#00346D",lineHeight:"17px"},children:i.gift_data.name}),(0,w.jsxs)(a.A,{sx:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",padding:"3px 6px !important",background:"#CCEEF0",borderRadius:"4px",color:"#00AAB5"},children:[(0,w.jsx)(o.A,{style:{color:"#00AAB5"},children:i.gift_data.credit}),(0,w.jsx)(c.A,{style:{width:"27px",height:"18px"}})]})]}),(0,w.jsxs)(a.A,{sx:{display:"flex",flexDirection:"column",justifyContent:"flex-start",width:"100%"},children:[(0,w.jsx)(a.A,{sx:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:"0px",gap:"8px",width:"100%",height:"20px"},children:(0,w.jsxs)(o.A,{style:{fontWeight:400,fontSize:"12px",color:"#808286"},children:["\u0627\u0639\u062a\u0628\u0627\u0631 \u062a\u0627 ",(0,A.A)(i.expire_date)]})}),(0,w.jsx)(o.A,{style:{fontWeight:400,fontSize:"10px",color:"#828282"},children:"\u062a\u0627\u0631\u06cc\u062e \u06a9\u0633\u0628: ".concat((0,A.A)(i.create_date))})]})]})]}),(0,w.jsxs)(a.A,{sx:{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"flex-start",padding:"16px 0px",width:"100%"},children:[(0,w.jsxs)(a.A,{sx:{display:"flex",flexDirection:"column",alignItems:"flex-start",padding:"0px",gap:"16px",height:"470px"},children:[(0,w.jsx)(p.A,{children:"\u062a\u0648\u0636\u06cc\u062d\u0627\u062a"}),(0,w.jsx)(o.A,{children:i.gift_data.description})]}),(0,w.jsxs)(h.A,{onClick:function(){F(!0),u.A.get("".concat(j.J,"/api/club/user_gifts/get_gift_qrcode/?gift_id=").concat(i.id)).then((function(e){200===e.status&&_(e.data.qr_code)})).catch((function(e){417===e.response.status?k(e.response.data.error,{variant:"error"}):k("\u0645\u0634\u06a9\u0644\u06cc \u067e\u06cc\u0634 \u0622\u0645\u062f\u0647! \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u0633\u0639\u06cc \u06a9\u0646\u06cc\u062f",{variant:"error"})}))},style:{position:"absolute",bottom:"90px",width:"93%"},disabled:"valid"!==i.status.toLowerCase(),children:[(0,w.jsx)("img",{src:f.A,width:"26px",height:"20px",style:{color:"white"}}),(0,w.jsx)("div",{children:"\u0627\u0646\u062a\u0642\u0627\u0644 \u062c\u0627\u06cc\u0632\u0647"})]})]})]}),(0,w.jsx)(d.Ay,{anchor:"bottom",open:g,handleClose:function(){F(!1),_(null)},classes:{paper:v.paper},children:(0,w.jsxs)(a.A,{sx:{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center",padding:"30px 16px 40px",gap:"20px",background:"#FFFFFF"},children:[(0,w.jsx)(p.A,{style:{color:"#00346D"},children:i.gift_data.name}),(0,w.jsxs)(a.A,{sx:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[(0,w.jsx)(o.A,{children:"1- \u06af\u06cc\u0631\u0646\u062f\u0647 \u062c\u0627\u06cc\u0632\u0647\u060c \u0628\u0631\u0648\u06cc \u062f\u06a9\u0645\u0647 \u201c\u062f\u0631\u06cc\u0627\u0641\u062a \u062c\u0627\u06cc\u0632\u0647\u201d \u0628\u0632\u0646\u062f."}),(0,w.jsx)(o.A,{children:"2- \u06a9\u062f QR \u0632\u06cc\u0631 \u0631\u0627 \u0627\u0633\u06a9\u0646 \u06a9\u0646\u062f."})]}),(0,w.jsx)(a.A,{sx:{display:"flex",gap:2,width:"328px",height:"328px",justifyContent:"center",alignItems:"center"},children:I&&(0,w.jsx)(m.A,{value:I})})]})})]})}var C=n(13513);const D=function(e){var t=(0,x.A)(),n=(0,l.A)(t.breakpoints.down("md"));return(0,w.jsx)(w.Fragment,{children:n?(0,w.jsx)(F,(0,i.A)({},e)):(0,w.jsx)(C.A,(0,i.A)({},e))})}}}]);