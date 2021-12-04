import mongoose from 'mongoose'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export {
  Profile
}

const profileSchema = new mongoose.Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    avatar: {
      type: String,
      default: '/images/Account/user.svg'
    },
    balance: Number,
    created: { type: Date, default: Date.now },
    stripeCustomerId: String,
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: "Profile"}],
    payment: [{type: mongoose.Schema.Types.ObjectId, ref: "Payment"}],
    events:[{type: mongoose.Schema.Types.ObjectId, ref: "Event"}],
  },
  {
    timestamps: true,
  }
)

profileSchema.methods.displayName = function() {
  return `${this.firstName} ${this.lastName.charAt(0)}.`;
};

profileSchema.statics.insertDefaultProfiles = async function() {
  try {
    const defaulUsers = [{
      firstName: 'Renata',
      lastName: 'Jadranko',
      email: 'Renata.Jadranko@example.com'
    }, {
      firstName: 'Brian',
      lastName: 'Disha',
      email: 'Brian.Disha@example.com'
    }, {
      firstName: 'Myrtle',
      lastName: 'Bill',
      email: 'Myrtle.Bill@example.com'
    }, {
      firstName: 'Jack',
      lastName: 'Rene',
      email: 'Jack.Rene@example.com'
    }, {
      firstName: 'Jane',
      lastName: 'White',
      email: 'Jane.White@example.com'
    }];
    for (let object of defaulUsers) {
      const profile = new Profile(object);
      const customer = await stripe.customers.create({
        email: profile.email,
        description: profile.displayName()
      });
      profile.stripeCustomerId = customer.id;
      await profile.save();
    }
  } catch (err) {
    console.log(err);
  }
};

const Profile = mongoose.model('Profile', profileSchema)
