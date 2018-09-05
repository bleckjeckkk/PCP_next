import React, { Component } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Typography } from '@material-ui/core';

const poem = (
<pre>{`
    I walked under the rising sun
    Sea breeze - salty and fresh
    I walked blind, undone
    Blood oozing under my flesh

    I saw you - laying, unmoving
    Your eyes closed but fresh tears were flowing like a hidden waterfall
    Secretive, painful but full of beauty
    Tantalizing, fresh, but haunting

    To reach out, to touch - I walk blind, no more
    Too good at hiding, too good at subtle byes
    I watched you leaving the bright light of the sun and the salty, fresh breeze
    You were leaving and I was watching
    How did I not know that you were leaving with my soul?

    I met you when the sun was tired
    Your eyes open and happiness too faulty like waves
    To reach out, to touch - you remained secretive of your pain
    You were leaving and I was watching 
    How did I not know that you were leaving with my heart?

    I walked under the pouring rain
    Darkness seeping in my clothes and veins
    Walking yet again blindly
    Following a path I do not know

    The heavy rain so strong it hurts
    I found myself to the place I learned:
    You were there - eyes closed but a smile on your face
    To reach out, to touch- your secrets unfold
    How did I not know that you were leaving for good?
`}</pre>
);

export default () => (
    <AdminLayout>
        <Typography variant="headline"> Administrator Home Page </Typography>
        {poem}
    </AdminLayout>
)