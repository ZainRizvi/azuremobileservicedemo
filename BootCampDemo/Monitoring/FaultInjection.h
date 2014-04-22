//------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//------------------------------------------------------------

#pragma once

#include <windows.h>

struct PluginContext;

typedef void (*LoggerFunc)(
    __in PluginContext const * context,
    __in int level,
    __in DWORD error,
    __in wchar_t const * message);

typedef HRESULT (*CreateFaultPluginFunc)(
    __in PluginContext const * context,
    __out void ** userData);

typedef HRESULT (*RunFaultPluginCommandFunc)(
    __in PluginContext const * context,
    __in_z wchar_t const * commandString,
    __out_z wchar_t ** responseBuffer);

typedef BOOL (*FreeFaultResponseBufferFunc)(
    __in PluginContext const * context,
    __in wchar_t * responseBuffer);

typedef BOOL (*DestroyFaultPluginFunc)(
    __in PluginContext const * context);

struct PluginContext
{
    int Version;
    void * Reserved;
    wchar_t const * PluginId;
    LoggerFunc Logger;
    void * UserData;
};