import { EmailValidatorAdapter } from '@/infra/validators/email-validator-protocol'
import { Validation } from '@/validation/protocols'
import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddAcountValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['first_name', 'last_name', 'email', 'password', 'passwordConfirmation']) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    return new ValidationComposite(validations)
}
