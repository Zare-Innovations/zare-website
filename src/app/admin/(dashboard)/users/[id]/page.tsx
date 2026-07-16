'use client';

import {
  Text,
  Group,
  Button,
  TextInput,
  PasswordInput,
  Select,
  Grid,
  Card,
  Container,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconArrowLeft, IconCheck } from '@tabler/icons-react';
import { useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  CreateUser,
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from '@/store/api/users.api';
import { createUserSchema, editUserSchema, UserFormData } from './user.schema';

const ROLE_OPTIONS = ['Admin', 'Super Admin', 'Recruiter', 'Manager', 'Editor'];

export default function UserForm() {
  const { id } = useParams();
  const userId = Array.isArray(id) ? id[0] : id;
  const isEdit = Boolean(userId && userId !== 'new');

  const router = useRouter();

  const { data: userData, isLoading: isLoadingUser } = useGetUserQuery(
    userId!,
    { skip: !isEdit },
  );

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const form = useForm<UserFormData>({
    validate: zodResolver(isEdit ? editUserSchema : createUserSchema),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'Admin',
      organizationName: '',
      bankAccount: '',
      profilePicture: '',
      password: '',
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isEdit && userData) {
      form.setValues({
        firstName: userData.firstName ?? '',
        lastName: userData.lastName ?? '',
        email: userData.email,
        phone: userData.phone ?? '',
        role: userData.role ?? 'Admin',
        organizationName: userData.organizationName ?? '',
        bankAccount: userData.bankAccount ?? '',
        profilePicture: userData.profilePicture ?? '',
        password: '',
      });
    }
  }, [isEdit, userData]);

  const handleSubmit = async (values: UserFormData) => {
    try {
      if (isEdit && userId) {
        const payload: Partial<CreateUser> = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          role: values.role,
          organizationName: values.organizationName,
          bankAccount: values.bankAccount,
          profilePicture: values.profilePicture,
        };
        if (values.password && values.password.trim().length > 0) {
          payload.password = values.password;
        }
        await updateUser({ id: userId, data: payload }).unwrap();
      } else {
        await createUser(values as CreateUser).unwrap();
      }

      notifications.show({
        title: 'Success!',
        message: isEdit
          ? 'User has been updated successfully'
          : 'User has been created successfully',
        color: 'teal',
        icon: <IconCheck size={16} />,
      });

      router.push('/admin/users');
    } catch (err) {
      console.error('User submission error:', err);
      notifications.show({
        title: isEdit ? 'Update Failed' : 'Creation Failed',
        message: 'Please check the form and try again.',
        color: 'red',
      });
    }
  };

  const handleSubmitError = (errors: typeof form.errors) => {
    console.error('Form validation errors:', errors);
    notifications.show({
      title: 'Validation Error',
      message: 'Please fix the errors in the form before submitting',
      color: 'red',
      icon: <IconAlertCircle size={16} />,
    });
  };

  if (isEdit && isLoadingUser) {
    return (
      <Container size="lg" py="xl">
        <Text>Loading user data...</Text>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Group mb="md">
        <Button
          component={Link}
          href="/admin/users"
          variant="subtle"
          leftSection={<IconArrowLeft size={14} />}
        >
          Back to users
        </Button>
      </Group>

      <div className="p-4 rounded-lg bg-white mb-6">
        <Text size="xl" color="dark">
          {isEdit ? 'Edit User' : 'Create a User'}
        </Text>
        <Text size="sm" color="gray.6">
          {isEdit
            ? 'Update the details below to modify this user.'
            : 'Fill out the form to add a new admin/team user.'}
        </Text>
      </div>

      <Card shadow="sm" p="xl" radius="md">
        <form onSubmit={form.onSubmit(handleSubmit, handleSubmitError)}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="First Name"
                placeholder="Jane"
                size="md"
                withAsterisk
                {...form.getInputProps('firstName')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Last Name"
                placeholder="Doe"
                size="md"
                withAsterisk
                {...form.getInputProps('lastName')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Email"
                placeholder="jane@example.com"
                type="email"
                size="md"
                withAsterisk
                {...form.getInputProps('email')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Phone"
                placeholder="+251 912 345 678"
                size="md"
                withAsterisk
                {...form.getInputProps('phone')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Role"
                placeholder="Select role"
                data={ROLE_OPTIONS}
                searchable
                size="md"
                withAsterisk
                {...form.getInputProps('role')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Organization"
                placeholder="Zare Innovations"
                size="md"
                withAsterisk
                {...form.getInputProps('organizationName')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Bank Account"
                placeholder="Bank name / account number"
                size="md"
                withAsterisk
                {...form.getInputProps('bankAccount')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Profile Picture URL"
                placeholder="https://…"
                size="md"
                withAsterisk
                {...form.getInputProps('profilePicture')}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <PasswordInput
                label={isEdit ? 'New Password (leave empty to keep current)' : 'Password'}
                placeholder="At least 6 characters"
                size="md"
                withAsterisk={!isEdit}
                {...form.getInputProps('password')}
              />
            </Grid.Col>
          </Grid>

          <Group mt="xl">
            <Button
              type="submit"
              size="md"
              color="dark"
              style={{ backgroundColor: '#1a365d' }}
              loading={isCreating || isUpdating}
            >
              {isEdit ? 'Update User' : 'Create User'}
            </Button>
          </Group>
        </form>
      </Card>
    </Container>
  );
}
