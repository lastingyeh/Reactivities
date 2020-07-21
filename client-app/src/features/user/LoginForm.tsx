import React, { useContext } from 'react';
import { Form, Button, Label, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';

const validate = combineValidators({
  email: isRequired('email'),
  password: isRequired('password'),
});

const LoginForm = () => {
  const {
    userStore: { login },
  } = useContext(RootStoreContext);

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch((error) => ({ [FORM_ERROR]: error }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Header
            as='h2'
            content='Login to Reactivities'
            color='teal'
            textAlign='center'
          />
          <Field name='email' component={TextInput} placeholder='Email' />
          <Field
            name='password'
            component={TextInput}
            placeholder='Password'
            type='password'
          />
          {submitError && !dirtySinceLastSubmit && (
            <Label color='red' basic content={submitError.statusText} />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            positive
            content='Login'
            fluid
          />
      
        </Form>
      )}
    />
  );
};

export default LoginForm;
