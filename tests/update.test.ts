import supertest from "supertest"
import { app } from "../src/app"

describe('Route /users/id', () => {
  it('sould return 200 with the updated user', (done) => {
    supertest(app)
      .put('/api/users/1')
      .send({
        firmname: "Microsoft",
        firstname: "Mathys",
        lastname: "GASNIER",
	      email: "mathys.gasnier@institutsolacroup.com",
	      phone_number: "06.54.29.33.52",
	      password: "5k8z+RzrEUr3ZuL74SV/d9onGN1VU0zeb5TRfuwbp1M",
	      last_notif: null,
	      last_pick_up: 1700051952,
	      has_mail: false,
	      is_admin: false	
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toMatchObject({
          id: 1,
  	      firmname: "Microsoft",
  	      firstname: "Mathys",
        	lastname: "GASNIER",
  	      email: "mathys.gasnier@institutsolacroup.com",
  	      phone_number: "06.54.29.33.52",
  	      password: "5k8z+RzrEUr3ZuL74SV/d9onGN1VU0zeb5TRfuwbp1M",
  	      last_notif: null,
  	      last_pick_up: 1700051952,
  	      has_mail: false,
  	      is_admin: false	
        })
        done()
      })
  })
})
