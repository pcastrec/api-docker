import { registerDecorator, ValidationOptions, ValidationArguments, isEmail } from 'class-validator';

export const EmailValidator = (validationOptions?: ValidationOptions) => {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'EmailValidator',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [propertyName],
            options: validationOptions,
            validator: {
                validate(args: ValidationArguments) {
                    return isEmail(args)
                },
            },
        });
    };
}