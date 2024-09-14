while true; do
file="node_modules"
if [ -d "$file" ]; then
    while true; do
        clear
        play -q $HOME/Lubeban/sound/klik.mp3 &>/dev/null
        echo "Apakah Anda ingin menghapus session sebelumnya? (y/n)"
        read -p "Pilihan Anda: " hapus_session
        if [ "$hapus_session" = "y" ] || [ "$hapus_session" = "Y" ]; then
            echo "Menghapus session..."
            rm -rf sessions
            echo "Session dihapus."
        else
            echo "Session tidak dihapus."
        fi
        npm start
    done
else
    clear
    play -q $HOME/Lubeban/sound/salah.mp3 &>/dev/null
    echo "Node_Modules Belum Terinstall"
    sleep 5
    clear
    echo "Menginstall Node_Modules"
    nala install yarn -y
    yarn cache clean
    yarn
fi
done
