import React from 'react';

export interface Input {
  type: 'text' | 'password' | 'email' | 'number' | 'date' | 'time' | 'currency' | 'checkbox' | 'radio' | 'select' | 'textarea';
  label: string;
  placeholder?: string;
  value?: string | number | boolean | boolean[] | string[] | number[] | Date | [number, string];
  options?: string[];
  required?: boolean;
  disabled?: boolean;
  currency?: string;
  fixed?: boolean;
  min?: number;
  max?: number;
  onChange?: (value: any) => void;
}

const TextInput = (
  {
    type = 'text',
    label,
    placeholder = '',
    value = '',
    required,
    disabled,
    onChange,
  } : {
    type?: 'text' | 'password' | 'email' | 'number' | 'date' | 'time' | 'currency' | 'checkbox' | 'radio' | 'select' | 'textarea';
    label: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    disabled?: boolean;
    onChange?: (value: any) => void;
  }
) => (
  <div className="w-full">
    <label className="block pl-1" htmlFor={label.toLowerCase().replaceAll(' ', '_')}>{label}{required ? '*' : ''}</label>
    <input
      name={label.toLowerCase().replaceAll(' ', '_')}
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      onChange={(event) => onChange && onChange(event.target.value)}
      className="rounded-md border border-gray-500 ring-0 outline-none focus:border-blue-500 px-2 py-1 w-full"
    />
    {required && value === '' && (
      <div className="text-red-500 text-sm">{label} cannot be empty</div>
    )}
  </div>
);

const CurrencyInput = (
  {
    label,
    placeholder = '',
    value = 0,
    required,
    disabled,
    onChange,
    min = Number.MIN_VALUE,
    max = Number.MAX_VALUE,
    currency,
    fixed = false,
  } : {
    label: string;
    placeholder?: string;
    value?: number;
    required?: boolean;
    disabled?: boolean;
    onChange?: (value: any) => void;
    min?: number;
    max?: number;
    currency: string;
    fixed?: boolean;
  }
) => {

  const setCurrency = (nVal: string) => {
    onChange && onChange([value, nVal]);
  };

  const setValue = (nVal: string) => {
    let num = parseFloat(nVal);
    if (min && num < min) num = min;
    if (max && num > max) num = max;
    onChange && onChange([num, currency]);
  };
  return (
    <div className="w-full">
      <label className="block pl-1" htmlFor={label.toLowerCase().replaceAll(' ', '_')}>{label}{required ? '*' : ''}</label>
      <div className="w-full flex flex-row">
        <input
          type="number"
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={(event) => setValue(event.target.value)}
          className="rounded-l-md border-t border-l border-b border-gray-500 ring-0 outline-none focus:border-blue-500 px-2 py-1 appearance-none grow"
        />
        {fixed ? (
          <div className="h-[34px] border border-gray-500 rounded-r-md px-2 py-1 inline-block shrink-0">
            {currency}
          </div>
        ) : (
          <select
            className="h-[34px] border border-gray-500 rounded-r-md px-2 py-1 inline-block shrink-0 bg-transparent outline-none"
            defaultValue={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>

          </select>
        )}
      </div>

      {required && value === 0 && (
        <div className="text-red-500 text-sm">{label} cannot be empty</div>
      )}
    </div>
  )
};



const Form = (
  {
    inputs,
  } : {
    inputs: Input[];
  }
) => {

  return (
    <fieldset className="text-left flex flex-col">
      {inputs.map((input, index) => {
        switch (input.type) {
          case 'text':
          case 'password':
          case 'email':
            return <TextInput {...input} value={input.value as string} />;
          case 'currency':
            return <CurrencyInput {...input} value={input.value as number} />;
          case 'number':
          case 'date':
          case 'time':
          case 'checkbox':
          case 'radio':
          case 'select':
          case 'textarea':
          default:
            return null;
        }
      })}
    </fieldset>
  )
};

export default Form;