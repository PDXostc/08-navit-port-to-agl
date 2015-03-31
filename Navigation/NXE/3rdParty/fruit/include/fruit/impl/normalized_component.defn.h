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

#ifndef FRUIT_NORMALIZED_COMPONENT_INLINES_H
#define FRUIT_NORMALIZED_COMPONENT_INLINES_H

#include "../normalized_component.h"

namespace fruit {

template <typename... Params>
inline NormalizedComponent<Params...>::NormalizedComponent(Component<Params...>&& component)
  : storage(std::move(component.storage),
            fruit::impl::getTypeIdsForList<typename fruit::impl::meta::Apply<fruit::impl::meta::ConstructComponentImpl, Params...>::Ps>()) {
}

} // namespace fruit

#endif // FRUIT_NORMALIZED_COMPONENT_INLINES_H
