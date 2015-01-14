#!/usr/bin/env bash

ANDROID_SDK_FILENAME=/vagrant/android-sdk_r23.0.2-linux.tgz
#ANDROID_SDK=http://dl.google.com/android/$ANDROID_SDK_FILENAME
#sudo apt-get install python-software-properties
#sudo add-apt-repository ppa:webupd8team/java

#JAVA
sudo mkdir /usr/lib/jvm
cd /usr/lib/jvm
sudo tar zxvf /vagrant/jdk-7u71-linux-i586.tar.gz
sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk1.7.0_71/bin/java 1
sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/jdk1.7.0_71/bin/javac 1

curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs git expect libfontconfig #ant
# So ubuntu doesn't freak out about nodejs path, which is just silly
ln -s /usr/bin/nodejs /usr/bin/node

#curl -O $ANDROID_SDK
cd /home/vagrant
tar -xzvf $ANDROID_SDK_FILENAME
sudo chown -R vagrant android-sdk-linux/

echo "ANDROID_HOME=~/android-sdk-linux" >> /home/vagrant/.bashrc
echo "PATH=\$PATH:~/android-sdk-linux/tools:~/android-sdk-linux/platform-tools" >> /home/vagrant/.bashrc

npm install -g cordova
npm install -g ionic
expect -c '
set timeout -1   ;
spawn /home/vagrant/android-sdk-linux/tools/android update sdk -u --all --filter platform-tool,android-19,build-tools-19.1.0
expect { 
    "Do you accept the license" { exp_send "y\r" ; exp_continue }
    eof
}
'
sudo /home/vagrant/android-sdk-linux/platform-tools/adb kill-server
sudo /home/vagrant/android-sdk-linux/platform-tools/adb start-server
sudo /home/vagrant/android-sdk-linux/platform-tools/adb devices

#SAMBA
sudo apt-get install samba -y
cd /home/vagrant
mkdir PrescientShared
cp /vagrant/smb.conf /etc/samba/
(echo vagrant; echo vagrant; echo vagrant) |sudo smbpasswd -sa vagrant
sudo service smbd restart

