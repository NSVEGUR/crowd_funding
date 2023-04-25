const getDaysLeft = function(timestamp) {
  const date = new Date(timestamp);
  const curDate = /* @__PURE__ */ new Date();
  const diffTime = date.getTime() - curDate.getTime();
  const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
  return diffDays >= 0 ? diffDays : 0;
};
export {
  getDaysLeft as g
};
