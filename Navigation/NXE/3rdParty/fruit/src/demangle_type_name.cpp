/*
 * Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#define IN_FRUIT_CPP_FILE

#include "fruit/impl/util/demangle_type_name.h"

// This works with GCC and Clang. Will probably need a different implementation for other compilers.

#include <string>
#include <cxxabi.h>
#include <cstdlib>

std::string demangleTypeName(const char* name) {
  int status;
  std::string result;
  char *demangled_name = abi::__cxa_demangle(name, nullptr, nullptr, &status);
  if (status == 0) {
    result = demangled_name;
    std::free(demangled_name);
  }
  return result;
}
