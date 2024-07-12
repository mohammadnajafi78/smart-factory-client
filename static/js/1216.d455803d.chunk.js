"use strict";(self.webpackChunkbts=self.webpackChunkbts||[]).push([[1216],{93802:(e,t,n)=>{n.d(t,{A:()=>O});var o,i=n(89379),r=n(5544),a=n(64467),l=n(9950),s=n(51571),c=n(46670),d=n(47041),u=n(10371),f=n(68605),p=n(87233),x=n(57073),A=n(2683),h=n(70367),m=n(66822),y=n(92363),g=n(42617),v=n(14651),b=n(298),j=n(19223),S=n(83716),w=n(18116),C=n(98350),_=n(20760),R=n(2947),I=n.n(R),F=n(63184),T=n(44414),D=(0,y.default)({key:"mui-datatables",prepend:!0}),k=(0,v.A)({palette:{mode:"light",action:{active:s.A[600]},background:{default:c.A.white,dark:"#f4f6f8",paper:c.A.white},primary:{main:"#00AAB5"},secondary:{main:"#00AAB5"},text:{primary:s.A[900],secondary:s.A[600]}},components:(o={MUIDataTable:{styleOverrides:{root:{direction:"rtl",fontFamily:"IRANSans"},paper:{boxShadow:"none"},caption:{display:"none"}}},MuiToolbar:{styleOverrides:{root:{fontFamily:"IRANSans",textAlign:"center"}}},MuiCheckbox:{styleOverrides:{root:{color:"#00AAB5 !important"}}},MUIDataTableHeadCell:{styleOverrides:{root:{fontFamily:"IRANSans"},toolButton:{marginRight:"2px",marginLeft:"8px"}}},MuiTableCell:{styleOverrides:{root:{textAlign:"right",fontFamily:"IRANSans",fontSize:14,fontWeight:400,color:"#263238"},head:{backgroundColor:"purple"}}},MUIDataTableSelectCell:{styleOverrides:{headerCell:{}}},MuiTableFooter:{styleOverrides:{root:{fontFamily:"IRANSans","& .MuiToolbar-root":{backgroundColor:"white",fontFamily:"IRANSans"}}}},MuiTablePagination:{styleOverrides:{root:{fontFamily:"IRANSans"},selectLabel:{fontFamily:"IRANSans",fontSize:10},actions:{direction:"ltr"},displayedRows:{fontFamily:"IRANSans"}}},MuiFormControlLabel:{styleOverrides:{root:{fontFamily:"IRANSans",fontSize:12,fontWeight:8,display:"inline",flexDirection:"column"}}},MuiTypography:{styleOverrides:{root:{fontFamily:"IRANSans",fontSize:12,fontWeight:8}}},MUIDataTableFilter:{styleOverrides:{root:{direction:"rtl",fontFamily:"IRANSans",fontSize:12,fontWeight:8},resetLink:{color:"#00AAB5",fontSize:"16px",fontWeight:700},title:{fontSize:"16px",fontWeight:700},reset:{display:"flex",justifyContent:"space-between",flexDirection:"row",alignItems:"center",width:"700px"},gridListTile:{margin:0,padding:0}}},MuiInputBase:{styleOverrides:{root:{direction:"rtl",fontFamily:"IRANSans",fontSize:12},label:{direction:"rtl",fontFamily:"IRANSans",fontSize:12}}},MuiGrid:{styleOverrides:{root:{direction:"rtl",fontFamily:"IRANSans",fontSize:12,margin:0,paddingTop:0,paddingBottom:0},item:{margin:0,paddingTop:0,paddingBottom:0},grid:{margin:0,paddingTop:0,paddingBottom:0}}},MUIDataTableViewCol:{styleOverrides:{root:{direction:"rtl",fontFamily:"IRANSans",fontSize:12,padding:"16px 0px 16px 44px"},label:{direction:"rtl",fontFamily:"IRANSans",fontSize:12}}},MuiFormLabel:{styleOverrides:{root:{right:0,fontFamily:"IRANSans",fontSize:12}}},MuiInputLabel:{styleOverrides:{root:{right:0,fontFamily:"IRANSans",fontSize:12}}},MuiButton:{styleOverrides:{root:{right:0,fontFamily:"IRANSans",fontSize:12}}},MUIDataTableSearch:{styleOverrides:{main:{direction:"initial"}}},MuiTooltip:{styleOverrides:{tooltip:{fontFamily:"IRANSans",fontSize:9}}},MUIDataTableBodyCell:{styleOverrides:{stackedCommon:{fontSize:12}}},MUIDataTableToolbar:{styleOverrides:{actions:{textAlign:"left"},filterCloseIcon:{display:"none"},left:{display:"flex",justifyContent:"flex-start"},titleText:{color:"#00346D",fontWeight:700,fontSize:"20px",fontFamily:"IRANSans"}}},MUIDataTableToolbarSelect:{styleOverrides:{title:{paddingRight:"10px",fontSize:"18px",fontWeight:500,fontFamily:"IRANSans",color:"white"},root:{color:"white",backgroundColor:"#00AAB5"},iconButton:{color:"white"}}}},(0,a.A)(o,"MUIDataTableSelectCell",{styleOverrides:{headerCell:{},checkboxRoot:{color:"#00AAB5 !important"}}}),(0,a.A)(o,"MUIDataTableFilterList",{styleOverrides:{root:{justifyContent:"flex-start"}}}),(0,a.A)(o,"MuiOutlinedInput",{styleOverrides:{input:{background:"#F2F2F2"}}}),o)});k=(0,b.A)(k);const O=function(e){var t=(0,l.useState)(""),n=(0,r.A)(t,2),o=n[0],a=n[1],s={icons:{SearchIcon:function(e){return(0,T.jsx)(j.default,(0,i.A)((0,i.A)({},e),{},{style:{color:"#00AAB5"}}))},DownloadIcon:function(e){return(0,T.jsx)(S.A,(0,i.A)((0,i.A)({},e),{},{style:{color:"#00AAB5"}}))},ViewColumnIcon:function(e){return(0,T.jsx)(w.default,(0,i.A)((0,i.A)({},e),{},{style:{color:"#00AAB5"}}))},FilterIcon:function(e){return(0,T.jsx)(C.A,(0,i.A)((0,i.A)({},e),{},{style:{color:"#00AAB5"}}))}}};function c(t,n){e.setRowsPerPage(n),e.getData(t,n,o)}(0,l.useEffect)((function(){e.getData(e.page,e.rowsPerPage,o)}),[e.sort,e.filter]),console.log("props",e);var y={customTableBodyFooterRender:e.sumColumn>0?function(t,n,o){return function(e,t,n){var o=e.data.map((function(e){return parseInt(e.data[t].replaceAll(",",""))})).reduce((function(e,t){return e+t}),0);return(0,T.jsx)(d.A,{children:(0,T.jsx)(u.A,{children:n.map((function(e,n){return n===t-1?(0,T.jsx)(f.A,{children:"\u0645\u062c\u0645\u0648\u0639: "}):n===t?(0,T.jsx)(f.A,{style:{display:"inline-flex",width:"200px"},children:(0,T.jsx)(F.HG,{value:o,thousandSeparator:!0,displayType:"text"})}):(0,T.jsx)(f.A,{})}))})})}(t,e.sumColumn,e.columns)}:null,filter:!0,selectableRows:void 0===e.selectableRows||e.selectableRows,fixedHeader:!0,fixedSelectColumn:!0,tableBodyHeight:"56vh",filterType:"textField",rowsPerPage:e.rowsPerPage,count:e.count,serverSide:!0,enableNestedDataAccess:".",rowsPerPageOptions:[25,50,75,100,200],print:!1,search:void 0===e.search||e.search,responsive:"vertical",downloadOptions:{filterOptions:{useDisplayedColumnsOnly:!0,useDisplayedRowsOnly:!0}},onDownload:function(e,t,n,o){return"\ufeff"+e(n)+t(o)},rowHover:!0,resizableColumns:!1,textLabels:{body:{noMatch:(0,T.jsx)("div",{style:{margin:"10px",display:"flex",justifyContent:"center",alignItems:"center"},children:(0,T.jsx)(I(),{color:"#00AAB5",style:{marginBottom:"30px",marginTop:"10px"}})}),toolTip:(0,T.jsx)(p.A,{variant:"body2",color:"inherit",children:"\u0645\u0631\u062a\u0628 \u0633\u0627\u0632\u06cc"}),columnHeaderTooltip:function(e){return(0,T.jsxs)(p.A,{variant:"body2",color:"inherit",children:["\u0645\u0631\u062a\u0628 \u0633\u0627\u0632\u06cc \u0628\u0631\u0627\u0633\u0627\u0633 ",e.label]})}},pagination:{next:"\u0635\u0641\u062d\u0647 \u0628\u0639\u062f",previous:"\u0635\u0641\u062d\u0647 \u0642\u0628\u0644",rowsPerPage:"\u0631\u062f\u06cc\u0641 \u062f\u0631 \u0647\u0631 \u0635\u0641\u062d\u0647",displayRows:"\u0627\u0632",jumpToPage:"\u0631\u0641\u062a\u0646 \u0628\u0647 \u0635\u0641\u062d\u0647"},toolbar:{search:"\u062c\u0633\u062a\u062c\u0648",downloadCsv:"\u062f\u0627\u0646\u0644\u0648\u062f \u0641\u0627\u06cc\u0644 \u0627\u06a9\u0633\u0644",print:"\u067e\u0631\u06cc\u0646\u062a",viewColumns:"\u0646\u0645\u0627\u06cc\u0634 \u0633\u062a\u0648\u0646\u0647\u0627",filterTable:"\u0641\u06cc\u0644\u062a\u0631"},filter:{all:"\u0647\u0645\u0647",title:"\u0641\u06cc\u0644\u062a\u0631\u0647\u0627",reset:"\u067e\u0627\u06a9 \u06a9\u0631\u062f\u0646"},viewColumns:{title:"\u0646\u0645\u0627\u06cc\u0634 \u0633\u062a\u0648\u0646\u0647\u0627",titleAria:"\u0646\u0645\u0627\u06cc\u0634/\u0639\u062f\u0645 \u0646\u0645\u0627\u06cc\u0634 \u0633\u062a\u0648\u0646\u0647\u0627"},selectedRows:{text:"\u0631\u062f\u06cc\u0641 \u0627\u0646\u062a\u062e\u0627\u0628 \u0634\u062f\u0647",delete:"\u062d\u0630\u0641",deleteAria:"\u062d\u0630\u0641 \u0633\u0637\u0631(\u0647\u0627\u06cc) \u0627\u0646\u062a\u062e\u0627\u0628 \u0634\u062f\u0647"}},onTableChange:function(t,n){switch(t){case"changeRowsPerPage":case"changePage":c(n.page,n.rowsPerPage);break;case"resetFilters":e.setReset(!0)}},onFilterChange:function(t,n,o){e.onFilterChange(t,n,o)},onColumnSortChange:function(t,n){e.onColumnSortChange(t,n)},onRowClick:function(t,n){e.onRowClick(t,n)},onRowsDelete:function(t,n){e.onRowsDelete(t,n)},onSearchChange:function(e){a(e)},onSearchClose:function(){e.getData(e.page,e.rowsPerPage,"")},onRowSelectionChange:function(t,n,o){e.onRowSelectionChange(t,n,o)},customToolbarSelect:function(t,n,o){return!0===e.customToolbarSelectActive?e.customToolbarSelect(t,n,o):(0,T.jsx)(x.A,{onClick:function(){e.onRowsDelete(t),o([])},children:(0,T.jsx)(_.A,{style:{color:"white"}})})},selectToolbarPlacement:"replace",searchText:o,searchProps:{onKeyDown:function(t){"Enter"===t.key&&e.getData(e.page,e.rowsPerPage,o)}}};return(0,T.jsx)(m.C,{value:D,children:(0,T.jsx)(g.A,{theme:k,children:(0,T.jsx)(A.A,{children:(0,T.jsx)(h.Ay,{title:e.title,data:e.data,columns:e.columns,options:y,components:s})})})})}},56376:(e,t,n)=>{function o(e){return e.replace(/[\u0660-\u0669]/g,(function(e){return e.charCodeAt(0)-1632})).replace(/[\u06f0-\u06f9]/g,(function(e){return e.charCodeAt(0)-1776}))}n.d(t,{A:()=>o})},1216:(e,t,n)=>{n.r(t),n.d(t,{default:()=>R});var o=n(5544),i=n(9950),r=n(95537),a=n(4139),l=n(60172),s=n(38986),c=n(30582),d=n(72145),u=n(66059),f=n(14341),p=n(1572),x=n(86519),A=n(57073),h=n(41608),m=n(4721),y=n(93802),g=n(16673),v=n(56376),b=n(66146),j=n(29031),S=n(44414),w={};const C=function(e){var t=(0,i.useState)(0),n=(0,o.A)(t,2),a=n[0],l=(n[1],(0,i.useState)(1)),s=(0,o.A)(l,2),c=s[0],C=s[1],_=(0,i.useState)(25),R=(0,o.A)(_,2),I=R[0],F=R[1],T=(0,i.useState)([]),D=(0,o.A)(T,2),k=D[0],O=D[1],B=(0,i.useState)([]),P=(0,o.A)(B,2),M=P[0],N=P[1],z=(0,i.useState)(null),L=(0,o.A)(z,2),E=(L[0],L[1],(0,i.useState)(null)),U=(0,o.A)(E,2),W=(U[0],U[1],(0,i.useState)("")),H=(0,o.A)(W,2),V=H[0],J=H[1],G=(0,i.useState)(""),X=(0,o.A)(G,2),q=X[0],K=X[1],Q=(0,i.useState)(!1),Y=(0,o.A)(Q,2),Z=Y[0],$=Y[1],ee=(0,i.useState)(null),te=(0,o.A)(ee,2),ne=te[0],oe=te[1],ie=(0,j.dh)().enqueueSnackbar;(0,g.useHistory)();function re(t,n,o){h.A.post("".concat(m.J,"/api/management/club/user_gifts/user_gift_list/?gift__gift_id=").concat(e.data.gift_id,"&limit=").concat(n,"&offset=").concat(t*n).concat(""!==q?"&".concat(q):""),{order:V,search:o}).then((function(e){200===e.status&&(O(e.data.results),C(e.data.count))})).catch((function(e){417===e.response.status?ie(e.response.data.error,{variant:"error"}):ie("\u0645\u0634\u06a9\u0644\u06cc \u067e\u06cc\u0634 \u0622\u0645\u062f\u0647! \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u0633\u0639\u06cc \u06a9\u0646\u06cc\u062f",{variant:"error"})}))}return(0,i.useEffect)((function(){K(""),J("")}),[Z]),(0,i.useEffect)((function(){0===q.length&&0===V.length&&!0===Z&&(re(a,I,""),$(!1))}),[q,V]),(0,i.useEffect)((function(){N([{name:"user_info.user_id",label:"\u0634\u0646\u0627\u0633\u0647",options:{filter:!1}},{name:"user_info.first_name",label:"\u0646\u0627\u0645",options:{filter:!0,filterType:"custom",filterOptions:{display:function(e,t,n,o){return(0,S.jsxs)(d.A,{children:[(0,S.jsx)(u.A,{sx:{transform:"none",position:"initial"},children:"\u0646\u0627\u0645"}),(0,S.jsx)(f.A,{id:"name","aria-describedby":"my-helper-text",fullWidth:!0,placeholder:"\u0646\u0627\u0645",value:e[n],onChange:function(i){i.target.value?(e[n][0]=i.target.value,t(e[n],n,o)):(e[n]=[],t(e[n],n,o))}})]})}}}},{name:"user_info.last_name",label:"\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc",options:{filter:!0,filterType:"custom",filterOptions:{display:function(e,t,n,o){return(0,S.jsxs)(d.A,{children:[(0,S.jsx)(u.A,{sx:{transform:"none",position:"initial"},children:"\u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc"}),(0,S.jsx)(f.A,{id:"name","aria-describedby":"my-helper-text",fullWidth:!0,value:e[n],onChange:function(i){i.target.value?(e[n][0]=i.target.value,t(e[n],n,o)):(e[n]=[],t(e[n],n,o))}})]})}}}},{name:"user_info.mobile",label:"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06cc\u0644",options:{filter:!0,filterType:"custom",filterOptions:{display:function(e,t,n,o){return(0,S.jsxs)(d.A,{sx:{marginTop:"10px"},children:[(0,S.jsx)(u.A,{sx:{transform:"none",position:"initial"},children:"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06cc\u0644"}),(0,S.jsx)(f.A,{id:"name","aria-describedby":"my-helper-text",fullWidth:!0,value:e[n],onChange:function(i){i.target.value?(e[n][0]=i.target.value,t(e[n],n,o)):(e[n]=[],t(e[n],n,o))}})]})}}}},{name:"status",label:"\u0648\u0636\u0639\u06cc\u062a",options:{customBodyRender:function(e){return console.log("value",e),(0,S.jsx)(S.Fragment,{children:"valid"===(null===e||void 0===e?void 0:e.toLowerCase())?(0,S.jsx)(r.A,{sx:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",padding:"3px 6px !important",background:"#CCEEF0",borderRadius:"4px",color:"#00AAB5",width:"55%"},children:(0,S.jsx)(u.A,{style:{color:"#00AAB5",paddingLeft:0},children:"\u0645\u0648\u062c\u0648\u062f"})}):"expired"===(null===e||void 0===e?void 0:e.toLowerCase())?(0,S.jsx)(r.A,{sx:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",padding:"3px 6px !important",background:"#FDE8E8",borderRadius:"4px",color:"#F4777C !important",width:"55%"},children:(0,S.jsx)(u.A,{style:{color:"#F4777C",paddingLeft:0},children:"\u0645\u0646\u0642\u0636\u06cc \u0634\u062f\u0647"})}):(0,S.jsx)(r.A,{sx:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",padding:"3px 6px !important",background:"#F3F3F3",borderRadius:"4px",width:"55%"},children:(0,S.jsx)(u.A,{style:{color:"#A7A5A6",paddingLeft:0},children:"\u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0634\u062f\u0647"})})})},filter:!0,filterType:"custom",filterOptions:{display:function(e,t,n,o){return(0,S.jsxs)(d.A,{sx:{marginTop:"10px"},children:[(0,S.jsx)(u.A,{sx:{transform:"none",position:"initial"},children:"\u0648\u0636\u0639\u06cc\u062a"}),(0,S.jsxs)(p.A,{color:"primary",value:ne,exclusive:!0,onChange:function(i,r){oe(r),"valid"===(null===r||void 0===r?void 0:r.toLowerCase())?e[n][0]="\u0645\u0648\u062c\u0648\u062f":"expired"===(null===r||void 0===r?void 0:r.toLowerCase())?e[n][0]="\u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0634\u062f\u0647":"used"===(null===r||void 0===r?void 0:r.toLowerCase())?e[n][0]="\u0645\u0646\u0642\u0636\u06cc \u0634\u062f\u0647":e[n]=[],t(e[n],n,o)},sx:{marginTop:"5px",direction:"ltr",justifyContent:"flex-end"},children:[(0,S.jsx)(x.A,{value:"VALID",sx:{fontFamily:"IRANSans"},children:"\u0645\u0648\u062c\u0648\u062f"}),(0,S.jsx)(x.A,{value:"EXPIRED",sx:{fontFamily:"IRANSans"},children:"\u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0634\u062f\u0647"}),(0,S.jsx)(x.A,{value:"USED",sx:{fontFamily:"IRANSans"},children:"\u0645\u0646\u0642\u0636\u06cc \u0634\u062f\u0647"})]})]})}}}}])}),[]),(0,S.jsx)(y.A,{title:"\u062f\u0631\u06cc\u0627\u0641\u062a \u06a9\u0646\u0646\u062f\u06af\u0627\u0646",data:k,columns:M,rowsPerPage:I,setRowsPerPage:F,count:c,page:a,filter:q,sort:V,setReset:$,search:!1,getData:function(e,t,n){return re(e,t,n)},onRowClick:function(e,t){},onRowsDelete:function(e,t){return function(e,t){var n=[];e.data.map((function(e,t){n.push(k[e.index].user_id)})),h.A.post("".concat(m.J,"/api/management/user/user_delete/"),{user_ids:n}).then((function(e){200===e.status&&re(a,I,"")})).catch((function(e){417===e.response.status?ie(e.response.data.error,{variant:"error"}):ie("\u0645\u0634\u06a9\u0644\u06cc \u067e\u06cc\u0634 \u0622\u0645\u062f\u0647! \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u0633\u0639\u06cc \u06a9\u0646\u06cc\u062f",{variant:"error"})}))}(e)},onRowSelectionChange:function(e,t,n){},onFilterChange:function(e,t,n){return function(e,t,n){var o="";switch(e){case"user_info.first_name":t[1][0]?(w.user__first_name=t[1][0],o="__icontains"):delete w.user__first_name;break;case"user_info.last_name":t[2][0]?(w.user__last_name=t[2][0],o="__icontains"):delete w.user__last_name;break;case"user_info.mobile":t[3][0]?(w.user__mobile=(0,v.A)(t[3][0]),o="__icontains"):delete w.user__mobile;break;case"status":t[4][0]?(w.status="\u0645\u0648\u062c\u0648\u062f"==t[4][0]?"\u0670VALID":"\u0645\u0646\u0642\u0636\u06cc \u0634\u062f\u0647"==t[4][0]?"EXPIRED":"USED",o=""):(delete w.status,oe(null))}var i=w,r=Object.keys(i).map((function(e){return[e,i[e]]}));console.log("filterItems",r);var a="";(null===r||void 0===r?void 0:r.length)>0&&r.map((function(e,t){a=a+e[0]+o+"="+decodeURIComponent(e[1])+"&"})),a.replace("&&","&"),K(a)}(e,t)},onColumnSortChange:function(e,t){return function(e,t){var n={};switch(e){case"user_info.user_id":n.user__user_id=t;break;case"user_info.first_name":n.user__first_name=t;break;case"user_info.last_name":n.user__last_name=t;break;case"user_info.mobile":n.user__mobile=t;break;case"status":n.status=t}var o=n,i=Object.keys(o).map((function(e){return[e,o[e]]})),r="";(null===i||void 0===i?void 0:i.length)>0&&i.map((function(e,t){r="asc"===e[1]?e[0]:"-".concat(e[0])})),J(r)}(e,t)},customToolbarSelect:function(e,t,n){return function(e,t,n){var o=[];return e.data.map((function(e,t){o.push(k[e.index].id)})),(0,S.jsxs)(A.A,{onClick:function(){h.A.post("".concat(m.J,"/api/management/club/user_gifts/use_gift/"),{gift_ids:o}).then((function(e){200===e.status&&re(a,I,"")})).catch((function(e){417===e.response.status?ie(e.response.data.error,{variant:"error"}):ie("\u0645\u0634\u06a9\u0644\u06cc \u067e\u06cc\u0634 \u0622\u0645\u062f\u0647! \u0644\u0637\u0641\u0627 \u062f\u0648\u0628\u0627\u0631\u0647 \u0633\u0639\u06cc \u06a9\u0646\u06cc\u062f",{variant:"error"})}))},sx:{cursor:"pointer"},children:[(0,S.jsx)(b.A,{style:{color:"white",cursor:"pointer"}}),(0,S.jsx)(u.A,{style:{color:"white",fontSize:"16px"},children:"\u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u062c\u0627\u06cc\u0632\u0647"})]})}(e)},customToolbarSelectActive:!0})};var _=n(82310);function R(e){var t,n=(0,i.useState)(e.location.state.data[0]),d=(0,o.A)(n,2),u=d[0];d[1];return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(r.A,{sx:{mb:2,width:"100%"},children:(0,S.jsxs)(r.A,{sx:{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",padding:"15px",gap:"10px",width:"100%",backgroundColor:"white",borderRadius:"8px"},children:[(0,S.jsx)(s.A,{style:{color:"#00346D"},children:null===u||void 0===u?void 0:u.name}),(0,S.jsx)(r.A,{sx:{display:"flex",flexDirection:"row",width:"100%"},children:(0,S.jsxs)(a.Ay,{container:!0,spacing:2,children:[(0,S.jsx)(a.Ay,{item:!0,xs:6,children:(0,S.jsxs)("div",{style:{display:"inline-flex"},children:[(0,S.jsx)(l.A,{style:{color:"#00AAB5"},children:"\u0627\u0639\u062a\u0628\u0627\u0631 \u062a\u0627:"}),(0,S.jsx)(l.A,{style:{color:"#335D8A"},children:(0,_.A)(null===u||void 0===u?void 0:u.expire_date)})]})}),(0,S.jsx)(a.Ay,{item:!0,xs:6,children:(0,S.jsxs)("div",{style:{display:"inline-flex",alignItems:"center"},children:[(0,S.jsx)(l.A,{style:{color:"#00AAB5"},children:"\u0627\u0645\u062a\u06cc\u0627\u0632:"}),(0,S.jsxs)(r.A,{sx:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",padding:"3px 6px !important",background:"#CCEEF0",borderRadius:"4px",color:"#00AAB5"},children:[(0,S.jsx)(l.A,{style:{color:"#00AAB5"},children:null===u||void 0===u?void 0:u.credit}),(0,S.jsx)(c.A,{style:{width:"27px",height:"18px"}})]})]})})]})}),(0,S.jsx)(a.Ay,{container:!0,spacing:2,children:(0,S.jsx)(a.Ay,{item:!0,xs:12,children:(0,S.jsxs)("div",{style:{display:"inline-flex"},children:[(0,S.jsx)(l.A,{style:{color:"#00AAB5"},children:"\u062f\u0633\u062a\u0647 \u0628\u0646\u062f\u06cc:"}),(0,S.jsx)(l.A,{style:{color:"#335D8A"},children:null===u||void 0===u||null===(t=u.gift_type_info)||void 0===t?void 0:t.translate})]})})}),(0,S.jsx)(r.A,{sx:{display:"flex",flexDirection:"row",width:"100%"},children:(0,S.jsx)(a.Ay,{container:!0,spacing:2,children:(0,S.jsx)(a.Ay,{item:!0,xs:12,children:(0,S.jsxs)("div",{style:{display:"block"},children:[(0,S.jsx)(l.A,{style:{color:"#00AAB5",width:"20%"},children:"\u062a\u0648\u0636\u06cc\u062d\u0627\u062a:"}),(0,S.jsx)(l.A,{style:{color:"#335D8A"},children:null===u||void 0===u?void 0:u.description})]})})})})]})}),(0,S.jsx)(C,{data:u})]})}}}]);