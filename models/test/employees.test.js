const Employee = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employees', () => {

    it('should throw an error if no "args" ', () => {
        const emp = new Employee({}); // create new Department, but don't set `name` attr value

        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        });
    });

    it('should throw an error if "args" are not a string', () => {

        const cases = [{ firstName: {}, lastName: {}, department: {} }, { firstName: [], lastName: [], department: [] }];
        for (let arg of cases) {
            const emp = new Employee(arg);

            emp.validate((err) => {
                expect(err.errors.firstName).to.exist;
                expect(err.errors.lastName).to.exist;
                expect(err.errors.department).to.exist;
            });

        }

    });


      it('should not  throw an error if "args" are proper', () => {

        const cases = [{firstName : 'John', lastName: 'Pitt', department: 'IT'}, {firstName: 'Janina', lastName: 'Nowak', department: 'Konserwatorium powierzchni płaskich'}];
        for(let args of cases) {
          const emp = new Employee( args );

          emp.validate(err => {
            expect(err).to.not.exist;
          });

        }

      });

    after(() => {
        mongoose.models = {};
    });
});
