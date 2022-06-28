import {object, z, string, TypeOf} from "zod"

export const VerifyUserSchema = object({

    body:object({
        token: string({ required_error: "Token is required tttt" }).min(4, { message: 'Too short' }),
        userId: string({required_error: "Enter User Id"})
    })

})

export type VerifyUserInput = TypeOf<typeof VerifyUserSchema >["body"]