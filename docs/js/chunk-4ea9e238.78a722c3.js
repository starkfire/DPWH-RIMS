(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ea9e238"],{"372f":function(t,e,a){"use strict";var n=a("fc75"),o=a.n(n);o.a},"3a0f":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"archives"},[a("a-row",{attrs:{gutter:12}},[a("a-col",[a("p",{attrs:{id:"header"}},[t._v("Archives")]),a("p",{attrs:{id:"subheader"}},[t._v("All stored spreadsheets")])])],1),a("a-row",[a("a-table",{attrs:{columns:t.columns,rowKey:function(t){return t._id},dataSource:t.tableData,loading:t.loading},scopedSlots:t._u([{key:"date",fn:function(e){return a("span",{},[t._v(" "+t._s(e.split("T")[0])+" ")])}},{key:"time",fn:function(e){return a("span",{},[t._v(" "+t._s(e.split("T")[1].split(".")[0])+" ")])}},{key:"download",fn:function(e){return a("span",{},[a("a",{attrs:{href:"http://localhost:3000/api/archive/"+e}},[t._v("Download")])])}}])})],1)],1)},o=[],i=a("bc3a"),s=[{title:"Date",key:"date",dataIndex:"date",scopedSlots:{customRender:"date"}},{title:"Time",key:"time",dataIndex:"date",scopedSlots:{customRender:"time"}},{title:"Filename",key:"name",dataIndex:"name"},{title:"Download",key:"download",dataIndex:"_id",scopedSlots:{customRender:"download"}}],c={name:"Archives",data:function(){return{loading:!1,tableData:[],columns:s}},created:function(){this.fetchArchives()},methods:{fetchArchives:function(){var t=this;this.loading=!0,i["get"]("http://localhost:3000/api/archive").then((function(e){t.loading=!1,t.tableData=e.data})).catch((function(e){return t.handleNetworkError(e)}))},handleNetworkError:function(t){this.loading=!1,this.$notification.config({placement:"bottomLeft"}),this.$notification["error"]({message:"Cannot Connect to API",description:"Please check if the API is running and accessible"})}}},r=c,d=(a("372f"),a("2877")),l=Object(d["a"])(r,n,o,!1,null,"35df528c",null);e["default"]=l.exports},fc75:function(t,e,a){}}]);
//# sourceMappingURL=chunk-4ea9e238.78a722c3.js.map