# Makefile para compilar as implementações em C

CC = gcc
CFLAGS = -Wall -Wextra -std=c11 -O2
DEBUG_FLAGS = -g -DDEBUG

# Alvos
all: inverted_index_hash inverted_index

# Implementação com Hash Table (Recomendada)
inverted_index_hash: inverted_index_hash.c
	$(CC) $(CFLAGS) -o inverted_index_hash inverted_index_hash.c
	@echo "✅ Compilado: inverted_index_hash"

# Implementação com Árvore Binária
inverted_index: inverted_index.c
	$(CC) $(CFLAGS) -o inverted_index inverted_index.c
	@echo "✅ Compilado: inverted_index"

# Compilar com debug
debug: CFLAGS += $(DEBUG_FLAGS)
debug: all

# Executar implementação com Hash Table
run_hash: inverted_index_hash
	@echo "\n🚀 Executando implementação com Hash Table:\n"
	./inverted_index_hash

# Executar implementação com Árvore Binária
run_tree: inverted_index
	@echo "\n🚀 Executando implementação com Árvore Binária:\n"
	@if [ -f ../test_data/test_data.txt ]; then \
		./inverted_index < ../test_data/test_data.txt; \
	else \
		echo "⚠️  Arquivo test_data.txt não encontrado!"; \
	fi

# Executar ambas
run_all: run_hash run_tree

# Limpar arquivos compilados
clean:
	rm -f inverted_index_hash inverted_index
	@echo "🧹 Arquivos compilados removidos"

# Ajuda
help:
	@echo "📖 Comandos disponíveis:"
	@echo "  make              - Compila ambas implementações"
	@echo "  make run_hash     - Compila e executa Hash Table"
	@echo "  make run_tree     - Compila e executa Árvore Binária"
	@echo "  make run_all      - Executa ambas implementações"
	@echo "  make debug        - Compila com símbolos de debug"
	@echo "  make clean        - Remove arquivos compilados"
	@echo "  make help         - Mostra esta ajuda"

.PHONY: all debug run_hash run_tree run_all clean help
