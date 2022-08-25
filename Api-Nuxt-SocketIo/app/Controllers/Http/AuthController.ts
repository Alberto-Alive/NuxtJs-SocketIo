import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import {rules, schema} from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    const token = await auth.use("api").attempt(email, password, {
      expiresIn: "10 days",
    });
    return token.toJSON();
  }
  public async register({ request, auth }: HttpContextContract) {
    
    const validationSchema =  schema.create({
      username: schema.string({trim: true}, [rules.maxLength(255), rules.unique({ table: 'users', column: 'username'})]),
      password: schema.string({trim: true})
    })
    
    const validatedData = await request.validate({
      schema: validationSchema
    })
    const user = await User.create(validatedData)
    
    
    
    // const password = request.input("password");
    // const name = request.input("username");
    // const newUser = new User();
    // newUser.password = password;
    // newUser.username = name;
    // await newUser.save();
    const token = await auth.use("api").login(user, {
      expiresIn: "10 days",
    });
    return token.toJSON();
  }
  public async allUsers({ response }) {
    let allUsers = await User.all()
    console.log(allUsers);
    return response.json({
      data: allUsers,
    });
  }
}
