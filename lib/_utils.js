function keywords(array) {
  let out = '';
  if (array.length) {
    array.forEach((k) => {
      out += `${k.toLowerCase()},`;
    });
    return out.slice(0, out.length - 1);
  }
  return null;
}

module.exports = { keywords };
