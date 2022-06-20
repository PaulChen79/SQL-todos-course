const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const bcrypt = require("bcryptjs")
const db = require("../models")
const User = db.User

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: "That email is not registered!" })
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, { message: "Password incorrect!" })
          }
          return done(null, user)
        })
      }).catch(error => console.log(error))
  }))

  passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_ID,
				clientSecret: process.env.FACEBOOK_SECRET,
				callbackURL: process.env.FACEBOOK_CALLBACK,
				profileFields: ['email', 'displayName']
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					const { name, email } = profile._json
					const user = await User.findOne({ email })
					if (user) return done(null, user)
					const randomPassword = Math.random().toString(36).slice(-8)
					const salt = await bcrypt.genSalt(10)
					const hash = await bcrypt.hash(randomPassword, salt)
					const newUser = await User.create({ name, email, password: hash })
					return done(null, newUser)
				} catch (error) {
					console.error(error)
				}
			}
		)
	)

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => {
        user = user.toJSON()
        done(null, user)
      }).catch(error => console.log(error))
  })
}