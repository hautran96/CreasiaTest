if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/macbook/.gradle/caches/transforms-4/0670b9a1df81bd238bcc13ce5beded08/transformed/jetified-hermes-android-0.74.0-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/macbook/.gradle/caches/transforms-4/0670b9a1df81bd238bcc13ce5beded08/transformed/jetified-hermes-android-0.74.0-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

