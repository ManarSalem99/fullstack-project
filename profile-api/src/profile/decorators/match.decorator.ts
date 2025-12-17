import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'match',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedPropertyName = args.constraints[0];
          const fullObject = args.object as any;
          const relatedValue = fullObject ? fullObject[relatedPropertyName] : undefined;


          if (typeof value === 'undefined' && typeof relatedValue === 'undefined') {
            return true;
          }


          return value === relatedValue;
        },
      },
    });
  };
}