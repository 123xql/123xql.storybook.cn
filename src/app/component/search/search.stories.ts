import type { Meta, StoryObj } from '@storybook/angular';
import { Search } from "./search";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const meta: Meta<Search> = {
    component: Search,
    title: 'Components/Search',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<Search>;

export const Default: Story = {
    render: () => ({
        props: {
            placeholder: '请输入姓名',
            contactForm: new FormBuilder().group({
                name: ['zhangsan'],
            }),
        }
    }),
    parameters: {
        docs: {
            description: {
                story: 'Search 组件的默认状态，显示一个输入框，提示用户输入姓名。',
            },
        },
    },
}