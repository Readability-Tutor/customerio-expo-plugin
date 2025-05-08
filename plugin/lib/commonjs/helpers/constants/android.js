"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CIO_PROJECT_GOOGLE_SNIPPET = exports.CIO_PROJECT_GIST_MAVEN_SNIPPET = exports.CIO_PROJECT_BUILDSCRIPTS_REGEX = exports.CIO_PROJECT_ALLPROJECTS_REGEX = exports.CIO_GIST_MAVEN_REGEX = exports.CIO_APP_GOOGLE_SNIPPET = exports.CIO_APP_APPLY_REGEX = void 0;
const CIO_PROJECT_BUILDSCRIPTS_REGEX = exports.CIO_PROJECT_BUILDSCRIPTS_REGEX = /(buildscript\s*\{(.|\n)*dependencies\s*\{)/;
const CIO_APP_APPLY_REGEX = exports.CIO_APP_APPLY_REGEX = /(apply plugin: "com.android.application")/;
const CIO_GIST_MAVEN_REGEX = exports.CIO_GIST_MAVEN_REGEX = /maven { url "https:\/\/maven.gist.build" }/;
const CIO_PROJECT_ALLPROJECTS_REGEX = exports.CIO_PROJECT_ALLPROJECTS_REGEX = /(allprojects\s*\{(.|\n){1,500}repositories\s*\{)/;
const CIO_PROJECT_GIST_MAVEN_SNIPPET = exports.CIO_PROJECT_GIST_MAVEN_SNIPPET = '        maven { url "https://maven.gist.build" }';
const CIO_APP_GOOGLE_SNIPPET = exports.CIO_APP_GOOGLE_SNIPPET = 'apply plugin: "com.google.gms.google-services"  // Google Services plugin';
const CIO_PROJECT_GOOGLE_SNIPPET = exports.CIO_PROJECT_GOOGLE_SNIPPET = '        classpath "com.google.gms:google-services:4.3.13"  // Google Services plugin';
//# sourceMappingURL=android.js.map