import SimpleSchema from 'simpl-schema';

// export const AddressSchema = new SimpleSchema({
//   city: { type: String, max: 100 },
//   street: { type: String, max: 100 },
//   number: { type: Number },
//   zip: { type: String, regEx: /^[0-9]{4}$/ },
// });


export const AddressSchema = new SimpleSchema({
  street: {
    type: String,
    max: 100
  },
  city: {
    type: String,
    max: 50
  },
  state: {
    type: String,
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  },
  zip: {
    type: String,
    regEx: /^[0-9]{5}$/
  }
});