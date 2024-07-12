"use strict";(self.webpackChunkbts=self.webpackChunkbts||[]).push([[8869],{20699:(e,o,r)=>{r.d(o,{A:()=>f});var t=r(58168),n=r(98587),a=r(9950),i=r(60533),s=r(88465),d=r(59254),c=r(48283),u=r(62223),l=r(44414),p=["className"],A=(0,d.Ay)("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:function(e,o){return o.root}})((function(e){return{padding:e.theme.spacing(1,2,2)}}));const f=a.forwardRef((function(e,o){var r=(0,c.A)({props:e,name:"MuiAccordionDetails"}),a=r.className,d=(0,n.A)(r,p),f=r,b=function(e){var o=e.classes;return(0,s.A)({root:["root"]},u.n,o)}(f);return(0,l.jsx)(A,(0,t.A)({className:(0,i.A)(b.root,a),ref:o,ownerState:f},d))}))},62223:(e,o,r)=>{r.d(o,{A:()=>i,n:()=>a});var t=r(1763),n=r(423);function a(e){return(0,n.A)("MuiAccordionDetails",e)}const i=(0,t.A)("MuiAccordionDetails",["root"])},89187:(e,o,r)=>{r.d(o,{A:()=>g});var t=r(64467),n=r(98587),a=r(58168),i=r(9950),s=r(60533),d=r(88465),c=r(59254),u=r(48283),l=r(17706),p=r(43250),A=r(57399),f=r(44414),b=["children","className","expandIcon","focusVisibleClassName","onClick"],m=(0,c.Ay)(l.A,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:function(e,o){return o.root}})((function(e){var o,r=e.theme,n=e.ownerState,i={duration:r.transitions.duration.shortest};return(0,a.A)((o={display:"flex",minHeight:48,padding:r.spacing(0,2),transition:r.transitions.create(["min-height","background-color"],i)},(0,t.A)(o,"&.".concat(A.A.focusVisible),{backgroundColor:(r.vars||r).palette.action.focus}),(0,t.A)(o,"&.".concat(A.A.disabled),{opacity:(r.vars||r).palette.action.disabledOpacity}),(0,t.A)(o,"&:hover:not(.".concat(A.A.disabled,")"),{cursor:"pointer"}),o),!n.disableGutters&&(0,t.A)({},"&.".concat(A.A.expanded),{minHeight:64}))})),v=(0,c.Ay)("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:function(e,o){return o.content}})((function(e){var o=e.theme,r=e.ownerState;return(0,a.A)({display:"flex",flexGrow:1,margin:"12px 0"},!r.disableGutters&&(0,t.A)({transition:o.transitions.create(["margin"],{duration:o.transitions.duration.shortest})},"&.".concat(A.A.expanded),{margin:"20px 0"}))})),x=(0,c.Ay)("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:function(e,o){return o.expandIconWrapper}})((function(e){var o=e.theme;return(0,t.A)({display:"flex",color:(o.vars||o).palette.action.active,transform:"rotate(0deg)",transition:o.transitions.create("transform",{duration:o.transitions.duration.shortest})},"&.".concat(A.A.expanded),{transform:"rotate(180deg)"})}));const g=i.forwardRef((function(e,o){var r=(0,u.A)({props:e,name:"MuiAccordionSummary"}),t=r.children,c=r.className,l=r.expandIcon,g=r.focusVisibleClassName,h=r.onClick,y=(0,n.A)(r,b),R=i.useContext(p.A),C=R.disabled,w=void 0!==C&&C,G=R.disableGutters,M=R.expanded,N=R.toggle,S=(0,a.A)({},r,{expanded:M,disabled:w,disableGutters:G}),k=function(e){var o=e.classes,r=e.expanded,t=e.disabled,n=e.disableGutters,a={root:["root",r&&"expanded",t&&"disabled",!n&&"gutters"],focusVisible:["focusVisible"],content:["content",r&&"expanded",!n&&"contentGutters"],expandIconWrapper:["expandIconWrapper",r&&"expanded"]};return(0,d.A)(a,A.T,o)}(S);return(0,f.jsxs)(m,(0,a.A)({focusRipple:!1,disableRipple:!0,disabled:w,component:"div","aria-expanded":M,className:(0,s.A)(k.root,c),focusVisibleClassName:(0,s.A)(k.focusVisible,g),onClick:function(e){N&&N(e),h&&h(e)},ref:o,ownerState:S},y,{children:[(0,f.jsx)(v,{className:k.content,ownerState:S,children:t}),l&&(0,f.jsx)(x,{className:k.expandIconWrapper,ownerState:S,children:l})]}))}))},57399:(e,o,r)=>{r.d(o,{A:()=>i,T:()=>a});var t=r(1763),n=r(423);function a(e){return(0,n.A)("MuiAccordionSummary",e)}const i=(0,t.A)("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"])},71849:(e,o,r)=>{r.d(o,{A:()=>y});var t=r(87695),n=r(5544),a=r(64467),i=r(98587),s=r(58168),d=r(9950),c=(r(75772),r(60533)),u=r(88465),l=r(59254),p=r(48283),A=r(2897),f=r(35661),b=r(43250),m=r(48733),v=r(42233),x=r(44414),g=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","TransitionComponent","TransitionProps"],h=(0,l.Ay)(f.A,{name:"MuiAccordion",slot:"Root",overridesResolver:function(e,o){var r=e.ownerState;return[(0,a.A)({},"& .".concat(v.A.region),o.region),o.root,!r.square&&o.rounded,!r.disableGutters&&o.gutters]}})((function(e){var o,r=e.theme,t={duration:r.transitions.duration.shortest};return o={position:"relative",transition:r.transitions.create(["margin"],t),overflowAnchor:"none","&:before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(r.vars||r).palette.divider,transition:r.transitions.create(["opacity","background-color"],t)},"&:first-of-type":{"&:before":{display:"none"}}},(0,a.A)(o,"&.".concat(v.A.expanded),{"&:before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&:before":{display:"none"}}}),(0,a.A)(o,"&.".concat(v.A.disabled),{backgroundColor:(r.vars||r).palette.action.disabledBackground}),o}),(function(e){var o=e.theme,r=e.ownerState;return(0,s.A)({},!r.square&&{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(o.vars||o).shape.borderRadius,borderTopRightRadius:(o.vars||o).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(o.vars||o).shape.borderRadius,borderBottomRightRadius:(o.vars||o).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}},!r.disableGutters&&(0,a.A)({},"&.".concat(v.A.expanded),{margin:"16px 0"}))}));const y=d.forwardRef((function(e,o){var r=(0,p.A)({props:e,name:"MuiAccordion"}),a=r.children,l=r.className,f=r.defaultExpanded,y=void 0!==f&&f,R=r.disabled,C=void 0!==R&&R,w=r.disableGutters,G=void 0!==w&&w,M=r.expanded,N=r.onChange,S=r.square,k=void 0!==S&&S,T=r.TransitionComponent,j=void 0===T?A.A:T,I=r.TransitionProps,V=(0,i.A)(r,g),q=(0,m.A)({controlled:M,default:y,name:"Accordion",state:"expanded"}),B=(0,n.A)(q,2),W=B[0],D=B[1],E=d.useCallback((function(e){D(!W),N&&N(e,!W)}),[W,N,D]),L=d.Children.toArray(a),P=(0,t.A)(L),H=P[0],O=P.slice(1),z=d.useMemo((function(){return{expanded:W,disabled:C,disableGutters:G,toggle:E}}),[W,C,G,E]),F=(0,s.A)({},r,{square:k,disabled:C,disableGutters:G,expanded:W}),J=function(e){var o=e.classes,r={root:["root",!e.square&&"rounded",e.expanded&&"expanded",e.disabled&&"disabled",!e.disableGutters&&"gutters"],region:["region"]};return(0,u.A)(r,v.d,o)}(F);return(0,x.jsxs)(h,(0,s.A)({className:(0,c.A)(J.root,l),ref:o,ownerState:F,square:k},V,{children:[(0,x.jsx)(b.A.Provider,{value:z,children:H}),(0,x.jsx)(j,(0,s.A)({in:W,timeout:"auto"},I,{children:(0,x.jsx)("div",{"aria-labelledby":H.props.id,id:H.props["aria-controls"],role:"region",className:J.region,children:O})}))]}))}))},43250:(e,o,r)=>{r.d(o,{A:()=>t});const t=r(9950).createContext({})},42233:(e,o,r)=>{r.d(o,{A:()=>i,d:()=>a});var t=r(1763),n=r(423);function a(e){return(0,n.A)("MuiAccordion",e)}const i=(0,t.A)("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"])},87695:(e,o,r)=>{r.d(o,{A:()=>s});var t=r(96369),n=r(73893),a=r(27800),i=r(76562);function s(e){return(0,t.A)(e)||(0,n.A)(e)||(0,a.A)(e)||(0,i.A)()}}}]);