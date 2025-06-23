-- 🔄 FUNCION: borra los tokens vencidos
CREATE OR REPLACE FUNCTION limpiar_tokens_expirados()
RETURNS trigger AS $$
BEGIN
  DELETE FROM tokens_invalidados WHERE expires_at < NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 🔔 TRIGGER: se activa luego de insertar un nuevo token inválido
CREATE TRIGGER trigger_limpiar_tokens
AFTER INSERT ON tokens_invalidados
FOR EACH ROW
EXECUTE FUNCTION limpiar_tokens_expirados();
