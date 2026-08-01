# Módulo Móvil (React Native - Android & iOS)

Este directorio está preparado como workspace dentro del monorepo para la futura migración a aplicación móvil nativa (Android / iOS) de **Radio Universal de Lomas Coloradas**.

## Reutilización de Arquitectura:
- **`@radio-universal/shared`**: Comparte la misma lógica de negocio, tipos TypeScript, servicios de datos, persistencia y filtro de profanidad sin duplicar código.
- **Componentes Móviles**: Para las pantallas de React Native, utilice `StyleSheet.create` en archivos `.styles.ts` separados acorde a las reglas globales de ingeniería.
