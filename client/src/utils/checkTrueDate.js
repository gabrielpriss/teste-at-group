function formatDate (date) {
  var datePart = date.match(/\d+/g),
  year = datePart[0],
  month = datePart[1], day = datePart[2];
  return day+'/'+month+'/'+year;
}

export default function checkTrueDate(dateBirth) {
  let formatedDateBirth = formatDate(dateBirth)
  let dateCheck = new Date().toLocaleDateString();
  let d1 = formatedDateBirth.split("/");
  let c = dateCheck.split("/");

  let birth = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
  let check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

  if (check < birth) {
    // console.log("A data inicial já passou");
    return "A data de nascimento não pode ser futura";
  } else return true;
}