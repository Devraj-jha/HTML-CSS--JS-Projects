let classroom = {
  students: [
    { name: "Devraj", age: 18, marks: [90, 85, 80] },
    { name: "Alice", age: 19, marks: [75, 80, 95] },
    { name: "Bob", age: 17, marks: [88, 90, 92] },
  ],

  calsumarray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum / arr.length;
  },
};

let av0 = classroom.calsumarray(classroom.students[0].marks);
let av1 = classroom.calsumarray(classroom.students[1].marks);
let av2 = classroom.calsumarray(classroom.students[2].marks);

let totalavg = (av0 + av1 + av2) / 3;
console.log(totalavg);
