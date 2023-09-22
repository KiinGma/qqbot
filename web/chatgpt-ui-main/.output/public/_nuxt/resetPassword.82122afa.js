import{r as u,b as T,j as P,h as s,w as t,u as o,s as q,F as D,f as r,o as k,i as C,t as _,l as E,k as v,m as N,v as z}from"./entry.7de5b8ce.js";const A={class:"text-center text-h4"},G={key:0,class:"text-red"},H={class:"mt-5 d-flex justify-space-between"},K={__name:"resetPassword",setup(I){const d=u({old_password:"",new_password1:"",new_password2:""}),c=u({old_password:[e=>!!e||"Current password is required"],new_password1:[e=>!!e||"New password is required"],new_password2:[e=>!!e||"Confirm password is required",e=>e===d.value.new_password1||"Passwords do not match"]}),w=u({old_password:"",new_password1:"",new_password2:""}),i=u(null),V=u(null);u(!0);const f=u(!1);T(),u("password");const x=async()=>{const{data:e,error:a}=await N("/api/account/logout/",{method:"POST"},"$jlgr8oKniG");a.value||await z()},F=async()=>{i.value=null;const{valid:e}=await V.value.validate();if(e){f.value=!0;const{data:a,error:l}=await N("/api/account/password/change/",{method:"POST",body:JSON.stringify(d.value)},"$tpPe0jmrOO");if(f.value=!1,l.value)if(l.value.status===400){for(const m in d.value)l.value.data[m]&&(w.value[m]=l.value.data[m][0]);l.value.data.non_field_errors&&(i.value=l.value.data.non_field_errors[0])}else l.value.data.detail?i.value=l.value.data.detail:i.value="Something went wrong. Please try again.";else p.value=!0}},g=e=>{w.value[e]=""},p=u(!1);return(e,a)=>{const l=r("v-text-field"),m=r("v-form"),y=r("v-btn"),$=r("v-card-text"),b=r("v-card"),O=r("v-col"),S=r("v-row"),h=r("v-container"),U=r("v-card-title"),j=r("v-spacer"),B=r("v-card-actions"),R=r("v-dialog");return k(),P(D,null,[s(b,{style:{height:"100vh"}},{default:t(()=>[s(h,null,{default:t(()=>[s(S,null,{default:t(()=>[s(O,{sm:"9","offset-sm":"1",md:"6","offset-md":"3"},{default:t(()=>[s(b,{class:"mt-15",elevation:"0"},{default:t(()=>[C("div",A,_(e.$t("resetPassword")),1),s($,null,{default:t(()=>[s(m,{ref_key:"resetForm",ref:V},{default:t(()=>[s(l,{modelValue:o(d).old_password,"onUpdate:modelValue":[a[0]||(a[0]=n=>o(d).old_password=n),a[1]||(a[1]=n=>g("old_password"))],rules:o(c).old_password,"error-messages":o(w).old_password,label:e.$t("currentPassword"),variant:"underlined",clearable:""},null,8,["modelValue","rules","error-messages","label"]),s(l,{modelValue:o(d).new_password1,"onUpdate:modelValue":[a[2]||(a[2]=n=>o(d).new_password1=n),a[3]||(a[3]=n=>g("new_password1"))],rules:o(c).new_password1,"error-messages":o(w).new_password1,label:e.$t("newPassword"),variant:"underlined",clearable:""},null,8,["modelValue","rules","error-messages","label"]),s(l,{modelValue:o(d).new_password2,"onUpdate:modelValue":[a[4]||(a[4]=n=>o(d).new_password2=n),a[5]||(a[5]=n=>g("new_password2"))],rules:o(c).new_password2,"error-messages":o(w).new_password2,label:e.$t("confirmPassword"),variant:"underlined",clearable:""},null,8,["modelValue","rules","error-messages","label"])]),_:1},512),o(i)?(k(),P("div",G,_(o(i)),1)):E("",!0),C("div",H,[s(y,{block:"",color:"primary",loading:o(f),onClick:F,size:"large"},{default:t(()=>[v(_(e.$t("submit")),1)]),_:1},8,["loading"])])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),s(R,{modelValue:o(p),"onUpdate:modelValue":a[6]||(a[6]=n=>q(p)?p.value=n:null),persistent:"",width:"auto"},{default:t(()=>[s(b,null,{default:t(()=>[s(U,{class:"text-h5"},{default:t(()=>[v(_(e.$t("yourPasswordHasBeenReset")),1)]),_:1}),s($,null,{default:t(()=>[v(_(e.$t("nowYouNeedToSignInAgain")),1)]),_:1}),s(B,null,{default:t(()=>[s(j),s(y,{color:"green-darken-1",variant:"text",onClick:x},{default:t(()=>[v(_(e.$t("agree")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}}};export{K as default};