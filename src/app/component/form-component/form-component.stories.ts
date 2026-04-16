import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { FormComponent } from './form-component';
import { CommonModule } from '@angular/common';

const meta: Meta<FormComponent> = {
  title: 'Components/FormComponent',
  component: FormComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    placeholder: {
      control: 'text',
      defaultValue: '请输入姓名',
      description: '必要输入。输入框的占位符，默认为 "请输入姓名"',
    },  
    value: {
      control: 'text',
      defaultValue: '',
      description: '输入框的值，默认为空字符串',
      table: { disable: true }, 
    }, 
    isDisabled: {
      control: 'boolean',
      defaultValue: false,
      description: '可选输入。输入框是否禁用，默认为 false',
    },
    onInputChange: {
      table: { disable: true }, 
    },
    writeValue: {
      table: { disable: true },
    },
    registerOnChange: {
      table: { disable: true }, 
    },
    registerOnTouched: {
      table: { disable: true }, 
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'FormComponent 是一个自定义的表单组件，提供了输入框和占位符功能。它实现了 ControlValueAccessor 接口，可以与 Angular 的表单控件进行集成。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<FormComponent>;

// 默认状态
export const Default: Story = {
  args:{
    placeholder: '请输入姓名',
    value: '',
    isDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '这是 FormComponent 组件，展示了基本的输入框和占位符。',
      },
    }, 
  },
  render: (args) => {
    const name = new FormControl(args.value, Validators.required);
    const placeholder = args.placeholder || '请输入姓名';
    const isDisabled = args.isDisabled || false;
    return {
      props: {
        placeholder,
        name,
        isDisabled,
      },
      template: `
        <!-- TS 代码展示 FormControl 的创建 
          name = new FormControl(argTypes.value, Validators.required);
        -->

        <!-- HTML 模板展示 FormComponent -->
        <app-form-component [formControl]="name" [placeholder]="placeholder" [isDisabled]="isDisabled"></app-form-component>

        `,
    };
  },
};

export const Disabled: Story = {
  args:{
    placeholder: '请输入姓名',
    value: '',
    isDisabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '这是 FormComponent 组件的禁用状态，输入框被禁用，无法进行输入。',
      },
    },
  },
  render: (args) => {
    const name = new FormControl(args.value, Validators.required);
    const placeholder = args.placeholder || '请输入姓名';
    const isDisabled = args.isDisabled || false;
    return {
      props: {
        placeholder,
        name,
        isDisabled,
      },
      template: `
        <!-- TS 代码展示 FormControl 的创建
          name = new FormControl(argTypes.value, Validators.required);
        -->
        <!-- HTML 模板展示 FormComponent -->
        <app-form-component [formControl]="name" [placeholder]="placeholder" [isDisabled]="isDisabled"></app-form-component>
        `,
    };
  },
};
