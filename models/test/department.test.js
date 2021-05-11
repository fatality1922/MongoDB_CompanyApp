// const Department = require('../departments.model.js');
// const expect = require('chai').expect;
// const mongoose = require('mongoose');

// describe('Department', () => {

//     it('should throw an error if no "name" arg', () => {
//         const dep = new Department({}); // create new Department, but don't set `name` attr value

//         dep.validate(err => {
//             expect(err.errors.name).to.exist;
//         });
//     });

//     it('should throw an error if "name" is not a string', () => {

//         const cases = [{}, []];
//         for(let name of cases) {
//           const dep = new Department({ name });
      
//           dep.validate(err => {
//             expect(err.errors.name).to.exist;
//           });
      
//         }
      
//       });

//       it('should throw an error if "name" has not a proper length', () => {

//         const cases = ['s', 'jiopg34eqgopqejopq4jophq3ejophq3e4'];
//         for(let name of cases) {
//           const dep = new Department({ name });
      
//           dep.validate(err => {
//             expect(err.errors.name).to.exist;
//           });
      
//         }
      
//       });

//       it('should not  throw an error if "name" is proper', () => {

//         const cases = ['ssdasda', 'jiopophq3e4'];
//         for(let name of cases) {
//           const dep = new Department({ name });
      
//           dep.validate(err => {
//             expect(err).to.not.exist;
//           });
      
//         }
      
//       });

//     after(() => {
//         mongoose.models = {};
//     });
// });